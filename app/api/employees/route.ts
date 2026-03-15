import { NextRequest, NextResponse } from "next/server";
import { getEmployees, createEmployee } from "@/lib/employeeStore";
import { cookies } from "next/headers";

async function isAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  return session?.value === "demo_token_123";
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const employees = await getEmployees();
  return NextResponse.json(employees);
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  try {
    const data = await req.json();
    if (!data.name || !data.email || !data.department || !data.role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    
    const newEmployee = await createEmployee({
      name: data.name,
      email: data.email,
      department: data.department,
      role: data.role,
      salary: Number(data.salary) || 0,
      startDate: data.startDate || new Date().toISOString().split('T')[0],
      status: data.status || "active"
    });
    
    return NextResponse.json(newEmployee);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }
}
