import { NextRequest, NextResponse } from "next/server";
import { reorderEmployees } from "@/lib/employeeStore";
import { cookies } from "next/headers";

async function isAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  return session?.value === "demo_token_123";
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  try {
    const updates = await req.json();
    await reorderEmployees(updates);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}
