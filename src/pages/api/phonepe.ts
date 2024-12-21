import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import crypto from "crypto";

type Payload = {
  merchantId: string;
  merchantTransactionId: string;
  merchantUserId: string;
  amount: number;
  redirectUrl: string;
  redirectMode: string;
  callbackUrl: string;
  mobileNumber: string;
  name: string;
  paymentInstrument: {
    type: string;
  };
};

type ErrorResponse = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | ErrorResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { payload }: { payload: Payload } = req.body;

    if (!payload || !payload.merchantId || !payload.merchantTransactionId) {
      return res
        .status(400)
        .json({ error: "Invalid or missing payload fields" });
    }

    const dataBase64 = Buffer.from(JSON.stringify(payload)).toString("base64");

    const fullURL =
      dataBase64 + "/pg/v1/pay" + process.env.NEXT_PUBLIC_SALT_KEY!;
    const dataSha256 = crypto
      .createHash("sha256")
      .update(fullURL)
      .digest("hex");
    const checksum = `${dataSha256}###${process.env.NEXT_PUBLIC_SALT_INDEX!}`;

    const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay";
    const options = {
      method: "POST",
      url: prod_URL,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      data: {
        request: dataBase64,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        return res.redirect(
          response.data.data.instrumentResponse.redirectInfo.url
        );
      })
      .catch(function (error) {
        throw new Error(error);
      });
  } catch (error: any) {
    res.status(500).json({
      error:
        error.response?.data?.message ||
        error.message ||
        "Internal Server Error",
    });
  }
}
