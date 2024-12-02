import puppeteer from "puppeteer";
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import FormData from "form-data";
import axios from "axios";
import { InvoiceData } from "@/lib/types/checkout";
import { generateInvoiceHTMLforPDF } from "@/lib/utils/email-templates/invoice";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const WORDPRESS_UPLOAD_URL = process.env.WORDPRESS_UPLOAD_URL!;
  const { invoiceData }: { invoiceData: InvoiceData } = req.body;

  if (!invoiceData || !invoiceData.buyerDetails.email) {
    return res
      .status(400)
      .json({ error: "Invalid invoice data or missing email." });
  }

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const recipientEmail = invoiceData.buyerDetails.email;

    const htmlContent = generateInvoiceHTMLforPDF(invoiceData);

    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({ format: "A4" });

    await browser.close();
    const pdfPath = path.join(
      process.cwd(),
      `invoice_${invoiceData.orderDetails.orderNumber}.pdf`
    );
    fs.writeFileSync(pdfPath, pdfBuffer);

    const formData = new FormData();
    formData.append("file", fs.createReadStream(pdfPath));
    formData.append("title", `Invoice_${invoiceData.orderDetails.orderNumber}`);
    formData.append("description", `Invoice generated for ${recipientEmail}`);

    const wordpressUsername = process.env.WORDPRESS_USERNAME;
    const wordpressAppPassword = process.env.WORDPRESS_APP_PASSWORD;

    try {
      const uploadResponse = await axios.post(WORDPRESS_UPLOAD_URL, formData, {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Basic ${Buffer.from(
            `${wordpressUsername}:${wordpressAppPassword}`
          ).toString("base64")}`,
        },
      });

      fs.unlinkSync(pdfPath);

      res.status(200).json({
        message: "PDF generated and uploaded to WordPress",
        wordpressMediaUrl: uploadResponse.data.source_url,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
