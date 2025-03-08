import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/db';
import Employee from '../../../models/Employee';

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    console.log("Received Data:", data);
    
    // Make sure client does not send employeeId or serviceEmail.
    const { employeeId, serviceEmail, ...body } = data; 
    const employee = new Employee(body);
    await employee.save();
    
    return NextResponse.json(employee, { status: 201 });
  } catch (error) {
    console.error("Error creating employee:", error);
    return NextResponse.json({ error: "Error creating employee" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const employees = await Employee.find({}).sort({ createdAt: -1 });
    return NextResponse.json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    return NextResponse.json({ error: "Error fetching employees" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing employee ID" }, { status: 400 });
    }
    await Employee.findByIdAndDelete(id);
    return NextResponse.json({ message: "Employee deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting employee:", error);
    return NextResponse.json({ error: "Error deleting employee" }, { status: 500 });
  }
}