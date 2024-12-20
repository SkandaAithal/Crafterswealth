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

  const isProduction =
    process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_VERSION;

  if (!compressedBase64) {
    return res.status(400).json({ error: "Missing compressed PDF data." });
  }

  try {
    // Decompress the Base64 data to a PDF buffer
    const compressedBuffer = Buffer.from(compressedBase64, "base64");
    const pdfBuffer = zlib.inflateSync(compressedBuffer);

    // Sanitize the title to create a valid file name
    const sanitizedTitle = title.replace(/[/\\:*?"<>|]/g, "_");

    // Define the temporary file path
    const tempDir = isProduction ? "/tmp" : path.join(process.cwd(), "temp");
    const tempFilePath = path.join(tempDir, `${sanitizedTitle}.pdf`);

    // Ensure the temp directory exists in local development
    if (!isProduction && !fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    // Write the PDF file to the temporary directory
    fs.writeFileSync(tempFilePath, pdfBuffer);

    // Ensure the file exists
    if (!fs.existsSync(tempFilePath)) {
      throw new Error(`Temporary file not found: ${tempFilePath}`);
    }

    // Prepare FormData for WordPress upload
    const formData = new FormData();
    formData.append("file", fs.createReadStream(tempFilePath));
    formData.append("title", title);
    formData.append("description", description);

    // Upload the file to WordPress
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

    // Clean up the temporary file after successful upload
    fs.unlinkSync(tempFilePath);

    res.status(200).json({
      message: "File uploaded successfully",
      wordpressMediaUrl: uploadResponse.data.source_url,
    });
  } catch (error) {
    // Clean up the temporary file if it exists
    const tempFilePath = path.join(
      isProduction ? "/tmp" : path.join(process.cwd(), "temp"),
      `${title.replace(/[/\\:*?"<>|]/g, "_")}.pdf`
    );
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }

    let errorMessage = "An unknown error occurred";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data || error.message || error.toString();
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    res.status(500).json({
      error: errorMessage,
    });
  }
}
