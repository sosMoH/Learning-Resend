/// <reference types="node" />
import React from "react";
import { Resend } from "resend";
import { render } from "@react-email/components";
import AppleReceiptEmail from "../../src/emails/Apple";

const resend = new Resend("re_gAnJ9b3P_E8swJeQ3qrzpAwSEpeXvfFTM");

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { userEmail } = req.body;

    const htmlContent = await render(<AppleReceiptEmail />);

    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ['mohislamedu@gmail.com'],
      subject: "Your Apple Receipt",
      html: htmlContent,
    });

    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
