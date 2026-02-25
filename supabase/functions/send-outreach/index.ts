import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-admin-token",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const adminToken = req.headers.get("x-admin-token");
    const adminPassword = Deno.env.get("ADMIN_PASSWORD");

    if (!adminToken || adminToken !== adminPassword) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      return new Response(JSON.stringify({ error: "RESEND_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { leadIds, extraEmails } = await req.json();

    if (!leadIds || !Array.isArray(leadIds) || leadIds.length === 0) {
      return new Response(JSON.stringify({ error: "No lead IDs provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch leads
    const { data: leads, error: fetchError } = await supabase
      .from("leads")
      .select("*")
      .in("id", leadIds)
      .not("email", "is", null);

    if (fetchError) throw fetchError;
    if (!leads || leads.length === 0) {
      return new Response(JSON.stringify({ error: "No leads with emails found" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const results: { company: string; success: boolean; error?: string }[] = [];

    for (const lead of leads) {
      const name = lead.company_name;
      const subject = `Quick intro — moving help for ${name} residents`;
      const htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; color: #333;">
          <p>Hi there,</p>
          <p>I'm Ron Stewart, owner of <strong>Top Choice Moving Inc.</strong> We're a local crew based right here in the Seattle metro area.</p>
          <p>We specialize in helping folks move when the time comes — We are usually less expensive. We provide the labor paired with the client's truck of choice. By being labor-only, we can get the move done for less. We load... We unload. Save your back — let us do it!</p>
          <p>We'd like to partner with <strong>${name}</strong> to offer your tenants a professional moving experience. We'd like to give you <strong>$30.00 on a Visa gift card</strong> for every completed move you refer our way. No strings — Just our way of saying thanks for thinking of us.</p>
          <p>Happy to swing by with some business cards you can hand out, or just save my number.</p>
          <p>
            📞 (253) 267-3212<br/>
            📧 Stewartron329@gmail.com<br/>
            🌐 <a href="https://page-whisper-launch.lovable.app" style="color: #8B7355;">Website</a>
          </p>
          <p>Thanks for your time!</p>
          <p><strong>Ron Stewart</strong><br/>Top Choice Moving Inc.</p>
        </div>
      `;

      try {
        // Rate limit: 600ms between sends
        if (results.length > 0) {
          await new Promise((r) => setTimeout(r, 600));
        }

        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Ron Stewart <ron@topchoicemovinginc.com>",
            to: [lead.email, ...(extraEmails?.[lead.id] || [])],
            reply_to: "Stewartron329@gmail.com",
            subject,
            html: htmlBody,
          }),
        });

        if (res.ok) {
          results.push({ company: name, success: true });
          // Mark as contacted
          await supabase.from("leads").update({ status: "contacted" }).eq("id", lead.id);
        } else {
          const errData = await res.json();
          results.push({ company: name, success: false, error: errData.message || "Send failed" });
        }
      } catch (e) {
        results.push({ company: name, success: false, error: e.message });
      }
    }

    const sent = results.filter((r) => r.success).length;
    const failed = results.filter((r) => !r.success).length;

    return new Response(
      JSON.stringify({ sent, failed, results }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
