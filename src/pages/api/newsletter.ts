import mailchimp from "@mailchimp/mailchimp_marketing";
import { NextApiRequest, NextApiResponse } from "next";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY!,
  server: process.env.MAILCHIMP_SERVER!,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { email, firstName, lastName, source, phone } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    if (!source) {
      return res.status(400).json({ error: "Source is required" });
    }

    try {
      const response = await mailchimp.lists.addListMember(
        process.env.MAILCHIMP_AUDIENCE_ID!,
        {
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: firstName || "",
            LNAME: lastName || "",
            SOURCE: source,
            PHONE: phone || "",
          },
        }
      );

      return res
        .status(201)
        .json({ message: "Successfully subscribed", response });
    } catch (error: any) {
      if (error.response?.body?.title === "Member Exists") {
        return res
          .status(400)
          .json({ error: `${email} is already subscribed to the newsletter` });
      }
      const errorMessage =
        error.response?.body?.detail ||
        "Something went wrong. Please try again.";
      return res.status(500).json({ error: errorMessage });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
