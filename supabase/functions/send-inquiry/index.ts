import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface InquiryRequest {
  name: string;
  phone: string;
  email?: string;
  message: string;
}

async function sendEmail(to: string[], subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "Top Choice Moving <onboarding@resend.dev>",
      to,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const errorData = await res.text();
    throw new Error(`Resend API error: ${errorData}`);
  }

  return res.json();
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, phone, email, message }: InquiryRequest = await req.json();

    // Validate required fields
    if (!name || !phone || !message) {
      return new Response(
        JSON.stringify({ error: "Name, phone, and message are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Send notification to business
    const businessEmail = await sendEmail(
      ["Topchoicemovinginc@gmail.com"],
      `New Moving Inquiry from ${name}`,
      `
        <h2>New Moving Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        ${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">Sent from Top Choice Moving website</p>
      `
    );

    console.log("Business notification sent:", businessEmail);

    // Send confirmation to customer if they provided email
    if (email) {
      const confirmationEmail = await sendEmail(
        [email],
        "We received your inquiry - Top Choice Moving",
        `
          <h2>Thank you for contacting Top Choice Moving!</h2>
          <p>Hi ${name},</p>
          <p>We've received your inquiry and will get back to you as soon as possible.</p>
          <p>Here's a copy of your message:</p>
          <blockquote style="border-left: 3px solid #e97451; padding-left: 15px; color: #555;">
            ${message}
          </blockquote>
          <p>We typically respond within 24 hours. If your request is urgent, please call us directly at <strong>253-267-3212</strong>.</p>
          <br>
          <p>Best regards,<br>Top Choice Moving Inc.</p>
          <hr>
          <p style="color: #666; font-size: 12px;">King County, Pierce County & Surrounding Areas</p>
        `
      );
      console.log("Customer confirmation sent:", confirmationEmail);
    }

    return new Response(
      JSON.stringify({ success: true, message: "Inquiry sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in send-inquiry function:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
