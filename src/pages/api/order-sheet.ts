import { creds } from "@/lib/constants";
import { fetchWithRetries } from "@/lib/utils";
import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "MethodNotAllowed" });
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: creds,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID!;
    const sheetName = "Orders";

    const {
      date,
      orderNumber,
      status,
      email,
      customer,
      customerType,
      products,
      itemsSold,
      invoiceNumber,
      coupons,
      netSales,
      cgst,
      sgst,
      igst,
      roundOff,
      netRevenue,
      invoice,
      attribution,
    } = req.body;

    const newRow = [
      date || "",
      orderNumber || "",
      status || "",
      email || "",
      customer || "",
      customerType || "",
      (products || []).join(", "),
      itemsSold || "",
      coupons && coupons.length > 0 ? coupons.join(", ") : "",
      invoiceNumber || "",
      netSales || "",
      cgst || "",
      sgst || "",
      igst || "",
      roundOff || "",
      netRevenue || "",
      invoice || "",
      attribution || "",
    ];

    await fetchWithRetries(() =>
      sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `${sheetName}!A1:R`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
          values: [newRow],
        },
      })
    );

    res
      .status(200)
      .json({ message: "Data successfully appended to the sheet" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to append data to the sheet", error });
  }
}
