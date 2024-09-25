import { NextApiRequest, NextApiResponse } from "next";
import CryptoJS from "crypto-js";
import yahooFinance from "yahoo-finance2";
import { ENCRYPTION_KEY } from "@/lib/constants";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { payload } = req.body;
    const decryptedBytes = CryptoJS.AES.decrypt(payload, ENCRYPTION_KEY);
    const decryptedPayload = JSON.parse(
      decryptedBytes.toString(CryptoJS.enc.Utf8)
    );

    if (!decryptedPayload.symbols || !Array.isArray(decryptedPayload.symbols)) {
      return res.status(400).json({ error: "Invalid symbols payload" });
    }

    const results = await yahooFinance.quote(decryptedPayload.symbols);
    const updatedStockData = results.map((result: any) => ({
      symbol: result.symbol,
      price: result.regularMarketPrice || 0,
      currency: result.currency || "INR",
    }));

    const encryptedResponse = CryptoJS.AES.encrypt(
      JSON.stringify(updatedStockData),
      ENCRYPTION_KEY
    ).toString();

    res.status(200).json({ data: encryptedResponse });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
}
