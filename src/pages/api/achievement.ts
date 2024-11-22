import { google } from "googleapis";
import type { NextApiRequest, NextApiResponse } from "next";
const creds = {
  type: "service_account",
  project_id: "crafterswealth-demo",
  private_key_id: "80deeb2aa069ecee0a002fb29d42258c7aff4617",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQChzY7gyVZHnmqG\nIhGua9Qdk4GWUim+nFdv7muK7OH3nMy3348yCzjrmq0c3fBD3Xr/X6Ypyb8f7ncy\nL51uoil2EaM9jMzT8HLXN1X5yi9yOwUFzAS33sg5vwE3vMt5f8oDZNdFCMDxuVt+\nxrX3n0k6Anw1Zyi5aUqvdS05eOGZDjx52m01TIUxvhneIeDt1X1/7edfLVS9AG6O\nzD6+ktFwxUnTKpm1aNCfjCF956fpEiofGcMKV3FG49mI5zwDSUHcSY9dCRrr3+kk\n0TcEZCE5E0W1l4dctP7ZRUMlycZ0nwfakcR4Xgn0GJnbALcZmsOXwDiCXmDE/tfY\nfYL6YmTLAgMBAAECggEAJT6JVHHT4/FxqMV/12vnrBUvn5fzFvaq4894PsbPLu2P\nbAXQUt8lb4ovrfTiYOTC8rSkLXtMfL+p/UnbjcNTEuP1dO4Lmf9/l82bgz+Ik11F\nhzOSpHZqFWzDjX5uQd3p9MUKDlB5BUs65eA8s66dLvaye6Juy9sSP3gT/GY4W7/+\n8Oj6L+Fth6haONdi26jP7XlllQ99IvsVrJdsp9e4ThXdvnTvofeB6kbvA5kYkY71\n+Z0VAJWpE6DcKxeRMj17M0uH4r6e5d+N4p5gZYTrzdxOO8WycF6N4UCVDZKgl9K5\nUT6Ag8RpWhV28c8aXXOQCrXl275y2Dj3VD4ufFwRSQKBgQDP8BoMTeiBiNSN9jjh\nZIvCqy0v9zJfQACITodRAtXGm0x4nh3Tg9zjSA+SDiWBX8rWFKZr2A1NhPGcqIDa\n83svX+rmRsXOWRQLOdvoQGmx0SgbJjBbYrupQQ3YjVpGzbOruSfWX9oz88OHDNjm\nZT+UIB9xqXDmvoypo/soPbihWQKBgQDHM5rfkeTpNfFlq1ng+yudfDTmcGeY3etu\nWNK1Uhx2NublRvVnsrX9NljKjQEUqg45T9kf1EX83+QJk8bSqWnxLXj8fVI68Rcz\nVUMQTQwr+Jo5/jWbhMvxq59K7UpodHiJ9ViOk23zgOzVyzGHEAMWCqxvFb4hCCvz\nFAungh2uwwKBgQCLFmKGCnLUem8bCjCf6z5lF1TheasS9V+lzUlMEeZms6hiIfl3\nawOMb74ihx3lPOsTabqr9ldnm951WGzgh+7FEJayM3LKhOEYZTpITxWj4HDAQDom\nVpOKMj6NtHdHVv6wheg0x+bPy2TlZ92Jtv3hGd+OirU/UwQJ0OsFzss5+QKBgQCu\n9IwZwDGlAlO6T/zotLFh6C0uF5tlj8OvbyPhTPTifuXcia4QHc3pT0o83AsO8yz6\n+T5hzjaKGrpWDwyZCWKbCK0yVX9bdVRDKad1MbZ3CCmstbCvnrrgzzNgw3iOtX0I\n7guRbbssGxfnzkb5sP6E5Wr9RcNvj5XKMNjrjkQzsQKBgBAcbuZFvLVxo4q64xWE\ns3UUBMbUWKqkRpbp8S01qfqt+w+iPXWssuY4X++bha5QpOvYhr+OU5A/pv/uxEuS\nVgnpmOdKc1le5rOrMZcdzrDDVI2vi8DvFkzElW5ZMiySVRDmwWBMpkxd+r6dvqOn\nA3+uCRGw1lpIlI1B+pEPPmrf\n-----END PRIVATE KEY-----\n",
  client_email:
    "crafterswealth-spreadsheet@crafterswealth-demo.iam.gserviceaccount.com",
  client_id: "114593522544168159598",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/crafterswealth-spreadsheet%40crafterswealth-demo.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

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
    const spreadsheetId = "1GguhNSRIfRy19Xr2q9MX3mMRJUhxC97XCZn6lg-GJvg";

    const metadata = await sheets.spreadsheets.get({ spreadsheetId });
    const sheetNames = metadata.data.sheets?.map(
      (sheet) => sheet.properties?.title
    );

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
      "Stock Name",
      "PdfLink",
      "Product Name",
    ];

    for (const sheetName of sheetNames) {
      const range = `'${sheetName}'!A1:Z`;
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });

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
              if (fieldIndex !== -1) {
                acc[field] = row[fieldIndex] || null;
              }
              return acc;
            },
            {} as Record<string, any>
          )
        );

      sheetData[sheetName as string] = filteredData;
    }

    res.status(200).json(sheetData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
