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
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const WORDPRESS_UPLOAD_URL = process.env.WORDPRESS_UPLOAD_URL!;
  const wordpressUsername = process.env.WORDPRESS_USERNAME!;
  const wordpressAppPassword = process.env.WORDPRESS_APP_PASSWORD!;

  const { compressedBase64, title, description } = req.body;

  if (!compressedBase64) {
    return res.status(400).json({ error: "Missing compressed PDF data." });
  }

  const compressedBuffer = Buffer.from(compressedBase64, "base64");
  const pdfBuffer = zlib.inflateSync(compressedBuffer);

  try {
    const tempFilePath = path.join("/tmp", `${title}.pdf`);
    fs.writeFileSync(tempFilePath, pdfBuffer);

    const formData = new FormData();
    formData.append("file", fs.createReadStream(tempFilePath), title);
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
