import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.join(process.cwd(), "invoiceCounter.txt");

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "1", "utf-8");
  }

  let currentNumber = parseInt(fs.readFileSync(filePath, "utf-8"), 10);

  if (req.method === "GET") {
    res.status(200).json({ invoiceNumber: currentNumber });
  } else if (req.method === "POST") {
    currentNumber += 1;
    fs.writeFileSync(filePath, currentNumber.toString(), "utf-8");
    res.status(200).json({ invoiceNumber: currentNumber });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
