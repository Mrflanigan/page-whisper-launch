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
      from: "Top Choice Moving <noreply@topchoicemovinginc.com>",
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

    // Send notification to business owner
    const businessEmail = await sendEmail(
      ["sewartron329@gmail.com"],
      `New Moving Inquiry from ${name}`,
      `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #3d3630; padding: 30px; border-radius: 10px;">
          <h1 style="color: #e97451; text-align: center; font-size: 24px; margin-bottom: 20px;">New Moving Inquiry</h1>
          <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="color: #fff; margin: 10px 0;"><strong style="color: #e97451;">Name:</strong> ${name}</p>
            <p style="color: #fff; margin: 10px 0;"><strong style="color: #e97451;">Phone:</strong> <a href="tel:${phone}" style="color: #fff;">${phone}</a></p>
            ${email ? `<p style="color: #fff; margin: 10px 0;"><strong style="color: #e97451;">Email:</strong> <a href="mailto:${email}" style="color: #fff;">${email}</a></p>` : ''}
          </div>
          <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 8px;">
            <p style="color: #e97451; font-weight: bold; margin-bottom: 10px;">Message:</p>
            <p style="color: #fff; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: rgba(255,255,255,0.5); font-size: 12px; text-align: center; margin-top: 20px;">Sent from Top Choice Moving website</p>
        </div>
      `
    );

    console.log("Business notification sent:", businessEmail);

    // Send confirmation to customer if they provided email
    if (email) {
      const confirmationEmail = await sendEmail(
        [email],
        "We received your inquiry - Top Choice Moving",
        `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f5f0e8; padding: 30px; border-radius: 10px;">
            <h1 style="color: #3d3630; text-align: center; font-size: 24px; margin-bottom: 10px;">Top Choice Moving</h1>
            <p style="color: #e97451; text-align: center; font-size: 14px; margin-bottom: 30px;">Professional Loading & Unloading Services</p>
            
            <h2 style="color: #3d3630; font-size: 20px;">Thank you for reaching out, ${name}!</h2>
            <p style="color: #555;">We've received your inquiry and will get back to you as soon as possible.</p>
            
            <div style="background: #fff; padding: 20px; border-radius: 8px; border-left: 4px solid #e97451; margin: 20px 0;">
              <p style="color: #888; font-size: 12px; margin-bottom: 10px;">Your message:</p>
              <p style="color: #333; white-space: pre-wrap;">${message}</p>
            </div>
            
            <p style="color: #555;">We typically respond within 24 hours. If your request is urgent, please call us directly:</p>
            <p style="text-align: center; margin: 20px 0;">
              <a href="tel:253-267-3212" style="background: #e97451; color: #fff; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">📞 253-267-3212</a>
            </p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            <p style="color: #888; font-size: 12px; text-align: center;">
              Top Choice Moving Inc.<br>
              King County, Pierce County & Surrounding Areas
            </p>
          </div>
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
