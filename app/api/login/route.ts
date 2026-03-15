import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (email === "admin@company.com" && password === "admin123") {
      const cookieStore = await cookies();
      cookieStore.set("session", "demo_token_123", {
        httpOnly: true,
        path: "/",
      });
      return NextResponse.json({ success: true, user: { email } });
    }
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
