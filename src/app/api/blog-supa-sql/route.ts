// app/api/blog-sql/route.ts
import { NextResponse } from "next/server";

const supabaseUrl = process.env.SUPABASE_PROJECT_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function GET() {
  const res = await fetch(`${supabaseUrl}/rest/v1/rpc/execute_sql`, {
    method: "POST",
    headers: {
      // supabaseへの認証部分
      apikey: supabaseServiceRoleKey,
      Authorization: `Bearer ${supabaseServiceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      // 実際のSQL操作部分
      query: 'SELECT * FROM "Post";',
    }),
  });

  const data = await res.json();
  console.log("DEBUG: ", data);
  return NextResponse.json(data);
}
