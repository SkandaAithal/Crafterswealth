import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import FormData from "form-data";
import axios from "axios";
import path from "path";
import zlib from "zlib";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const WORDPRESS_UPLOAD_URL = process.env.WORDPRESS_UPLOAD_URL!;
  const wordpressUsername = process.env.WORDPRESS_USERNAME!;
  const wordpressAppPassword = process.env.WORDPRESS_APP_PASSWORD!;

  const { compressedBase64, title, description } = req.body;

  if (!compressedBase64) {
    return res.status(400).json({ error: "Missing compressed PDF data." });
  }

  try {
    // Decompress the Base64-encoded PDF
    const compressedBuffer = Buffer.from(compressedBase64, "base64");
    const pdfBuffer = zlib.inflateSync(compressedBuffer);

    // Sanitize the file name
    const sanitizedTitle = title.replace(/[/\\:*?"<>|]/g, "_");
    const tempFilePath = path.join("/tmp", `${sanitizedTitle}.pdf`);

    // Write the file to the /tmp directory
    fs.writeFileSync(tempFilePath, pdfBuffer);

    // Ensure the file exists
    if (!fs.existsSync(tempFilePath)) {
      throw new Error(`Temporary file not found: ${tempFilePath}`);
    }

    // Prepare FormData for WordPress upload
    const formData = new FormData();
    formData.append("file", fs.createReadStream(tempFilePath), sanitizedTitle);
    formData.append("title", title);
    formData.append("description", description);

    const uploadResponse = await axios.post(WORDPRESS_UPLOAD_URL, formData, {
      headers: {
        ...formData.getHeaders(),
        Authorization: `Basic ${Buffer.from(
          `${wordpressUsername}:${wordpressAppPassword}`
        ).toString("base64")}`,
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });

    // Clean up the temporary file
    fs.unlinkSync(tempFilePath);

    res.status(200).json({
      message: "File uploaded successfully",
      wordpressMediaUrl: uploadResponse.data.source_url,
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
