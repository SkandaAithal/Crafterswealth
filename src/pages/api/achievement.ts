import { creds } from "@/lib/constants";
import { fetchWithRetries } from "@/lib/utils";
import { google } from "googleapis";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: creds,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID!;
    const sheetNames = ["Momentum Pulse", "Value Sprint"];

    if (!sheetNames || sheetNames.length === 0) {
      return res
        .status(404)
        .json({ message: "No sheets found in the spreadsheet" });
    }

    const sheetData: Record<string, any[]> = {};
    const fieldsToInclude = [
      "Pur. Price",
      "Target Price",
      "Days Held",
      "Profit",
      "PdfLink",
      "Product Name",
      "Company Name",
    ];

    for (const sheetName of sheetNames) {
      const range = `'${sheetName}'!A1:S`;
      const response = await fetchWithRetries(() =>
        sheets.spreadsheets.values.get({ spreadsheetId, range })
      );

      const rows = response.data.values;
      if (!rows || rows.length === 0) {
        sheetData[sheetName as string] = [];
        continue;
      }

      const [headers, ...data] = rows;
      const achievementDateIndex = headers.indexOf("Achievement Date");

      if (achievementDateIndex === -1) {
        sheetData[sheetName as string] = [];
        continue;
      }

      const filteredData = data
        .filter((row) => row[achievementDateIndex])
        .map((row) =>
          fieldsToInclude.reduce(
            (acc, field) => {
              const fieldIndex = headers.indexOf(field);
              acc[field] = fieldIndex !== -1 ? row[fieldIndex] || "" : "";
              return acc;
            },
            {} as Record<string, any>
          )
        )
        .filter((row) => {
          const profitValue = parseFloat(row["Profit"] || "0");
          return profitValue > 0;
        });

      sheetData[sheetName as string] = filteredData;
    }

    res.status(200).json(sheetData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
