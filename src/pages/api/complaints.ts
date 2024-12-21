import { creds } from "@/lib/constants";
import { fetchWithRetries } from "@/lib/utils";
import { google } from "googleapis";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "MethodNotAllowed" });
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: creds,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID!;
    const sheetName = "Complaints";

    const range = `${sheetName}!A:F`;
    const response = await fetchWithRetries(() =>
      sheets.spreadsheets.values.get({ spreadsheetId, range })
    );

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    const [headers, ...data] = rows;
    const formattedData = data.map((row) => {
      return headers.reduce((acc, header, index) => {
        acc[header] = row[index] || "";
        return acc;
      }, {});
    });

    res.status(200).json(formattedData);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch data from the sheet", error });
  }
}
