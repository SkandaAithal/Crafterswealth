import mailchimp from "@mailchimp/mailchimp_marketing";
import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY!,
  server: process.env.MAILCHIMP_SERVER!,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  const { email, firstName, lastName, source, phone, tags, address } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  if (!Array.isArray(tags) || tags.length === 0) {
    return res.status(400).json({ error: "At least one tag is required" });
  }

  try {
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID!;
    const subscriberHash = crypto
      .createHash("md5")
      .update(email.toLowerCase())
      .digest("hex");

    const completeAddress =
      address && address.addr1
        ? {
            addr1: address.addr1 || "",
            addr2: address.addr2 || "",
            city: address.city || "",
            state: address.state || "",
            zip: address.zip || "",
            country: address.country || "",
          }
        : undefined;

    try {
      const member = await mailchimp.lists.getListMember(
        audienceId,
        subscriberHash
      );

      if (member.status === "unsubscribed" || member.status === "cleaned") {
        await mailchimp.lists.updateListMember(audienceId, subscriberHash, {
          status: "subscribed",
          merge_fields: {
            FNAME: firstName || "",
            LNAME: lastName || "",
            SOURCE: source || "",
            PHONE: phone || "",
            ADDRESS: completeAddress || undefined,
          },
        });
      } else {
        await mailchimp.lists.updateListMember(audienceId, subscriberHash, {
          merge_fields: {
            FNAME: firstName || "",
            LNAME: lastName || "",
            SOURCE: source || "",
            PHONE: phone || "",
            ADDRESS: completeAddress || undefined,
          },
        });
      }

      await mailchimp.lists.updateListMemberTags(audienceId, subscriberHash, {
        tags: tags.map((tag: string) => ({ name: tag, status: "active" })),
      });

      return res
        .status(200)
        .json({ message: "User subscribed and tags updated successfully" });
    } catch (error: any) {
      if (error.response?.status === 404) {
        await mailchimp.lists.addListMember(audienceId, {
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: firstName || "",
            LNAME: lastName || "",
            SOURCE: source || "",
            PHONE: phone || "",
            ADDRESS: completeAddress || undefined,
          },
        });

        await mailchimp.lists.updateListMemberTags(audienceId, subscriberHash, {
          tags: tags.map((tag: string) => ({ name: tag, status: "active" })),
        });

        return res.status(201).json({
          message: "User added and tags updated successfully",
        });
      }

      throw error;
    }
  } catch (error: any) {
    const errorMessage =
      error.response?.body?.detail || "Something went wrong. Please try again.";
    return res.status(500).json({ error: errorMessage });
  }
}
