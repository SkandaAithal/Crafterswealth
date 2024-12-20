import puppeteer from "puppeteer-core";
import type { NextApiRequest, NextApiResponse } from "next";
import zlib from "zlib";
import { InvoiceData } from "@/lib/types/checkout";
import { generateInvoiceHTMLforPDF } from "@/lib/utils/email-templates/invoice";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { invoiceData }: { invoiceData: InvoiceData } = req.body;

  if (!invoiceData || !invoiceData.buyerDetails.email) {
    return res
      .status(400)
      .json({ error: "Invalid invoice data or missing email." });
  }

  try {
    let puppeteerInstance = puppeteer;
    let options = {};

    if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_VERSION) {
      puppeteerInstance = require("puppeteer-core");
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const chromium = require("@sparticuz/chromium");
      options = {
        args: chromium.args,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
      };
    } else {
      puppeteerInstance = require("puppeteer");
      options = { headless: true };
    }

    const browser = await puppeteerInstance.launch(options);
    const page = await browser.newPage();

    const htmlContent = generateInvoiceHTMLforPDF(invoiceData);
    await page.setContent(htmlContent);

    const pdfBuffer = await page.pdf({ format: "A4" });
    await browser.close();

    const compressedBuffer = zlib.deflateSync(pdfBuffer);
    const compressedBase64 = compressedBuffer.toString("base64");
    // Return the compressed Base64 string
    res.status(200).json({
      message: "PDF generated and compressed successfully",
      compressedBase64,
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
