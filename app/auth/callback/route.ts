import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") || "/";

  const response = NextResponse.redirect(new URL(next, requestUrl.origin));

  if (code) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://oepyclxcfvjdmofwjbmv.supabase.co";
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_UnSkenxGeMsc3LzJgBeUFw_5s8X6nsU";

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false },
    });

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (data?.session) {
      const isNdlongDomain = requestUrl.hostname.endsWith("ndlong.site");
      const domain = isNdlongDomain ? ".ndlong.site" : undefined;

      response.cookies.set("ndl_ecosystem_auth", JSON.stringify(data.session), {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
        secure: isNdlongDomain || requestUrl.protocol === "https:",
        domain,
      });
    } else if (error) {
      console.error("Auth callback error in sample-files:", error.message);
    }
  }

  return response;
}
