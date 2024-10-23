import { NextApiRequest, NextApiResponse } from "next";
import sha256 from "crypto-js/sha256";
import axios from "axios";
import { BASE_URL } from "@/lib/constants";
import { PAYMENT_FAILURE, PAYMENT_SUCCESS } from "@/lib/routes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { merchantId, transactionId } = req.body;

    const st =
      `/pg/v1/status/${merchantId}/${transactionId}` +
      process.env.NEXT_PUBLIC_SALT_KEY;
    const dataSha256 = sha256(st).toString();

    const checksum = dataSha256 + "###" + process.env.NEXT_PUBLIC_SALT_INDEX;

    const options = {
      method: "GET",
      url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${transactionId}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": `${merchantId}`,
      },
    };

    const response = await axios.request(options);
    const paymentStatus = response.data.code;

    if (paymentStatus === "PAYMENT_SUCCESS") {
      res.writeHead(301, {
        Location: `${BASE_URL}${PAYMENT_SUCCESS}?id=${transactionId}`,
      });
    } else {
      res.writeHead(301, { Location: `${BASE_URL}${PAYMENT_FAILURE}` });
    }
    res.end();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
