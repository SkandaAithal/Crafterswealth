import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import crypto from "crypto";

type Payload = {
  merchantTransactionId: string;
  merchantUserId: string;
  amount: number;
  redirectUrl: string;
  redirectMode: string;
  callbackUrl: string;
  mobileNumber: string;
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
    const { MERCHANT_ID, SALT_KEY, SALT_INDEX } = process.env;
    if (!MERCHANT_ID || !SALT_KEY || !SALT_INDEX) {
      throw new Error("Missing required environment variables.");
    }

    const { payload }: { payload: Payload } = req.body;

    if (!payload || !payload.merchantTransactionId || !payload.amount) {
      return res
        .status(400)
        .json({ error: "Invalid or missing payload fields" });
    }

    const payloadWithMerchantId = {
      ...payload,
      merchantId: MERCHANT_ID,
    };

    const dataBase64 = Buffer.from(
      JSON.stringify(payloadWithMerchantId)
    ).toString("base64");

    const apiPath = "/pg/v1/pay";
    const fullURL = dataBase64 + apiPath + SALT_KEY;
    const dataSha256 = crypto
      .createHash("sha256")
      .update(fullURL)
      .digest("hex");
    const checksum = `${dataSha256}###${SALT_INDEX}`;

    // UAT/Sandbox URL for PhonePe
    const sandbox_URL =
      "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

    const options = {
      method: "POST",
      url: sandbox_URL,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      data: {
        request: dataBase64,
      },
    };

    const response = await axios.request(options);

    if (
      response.data &&
      response.data.data?.instrumentResponse?.redirectInfo?.url
    ) {
      return res
        .status(200)
        .json(response.data.data.instrumentResponse.redirectInfo.url);
    } else {
      return res
        .status(500)
        .json({ error: "Unexpected response from PhonePe." });
    }
  } catch (error: any) {
    res.status(500).json({
      error:
        error.response?.data?.message ||
        error.message ||
        "Internal Server Error",
    });
  }
}
