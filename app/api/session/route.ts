import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  
  if (session && session.value === "demo_token_123") {
    return NextResponse.json({
      user: { email: "admin@company.com" },
      token: session.value
    });
  }
  
  return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
}
