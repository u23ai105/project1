import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import Blog from "../../../models/Blog";

export async function POST(request) {
  try {
    await connectDB();
    const { title, description } = await request.json();
    
    const blog = await Blog.create({
      title,
      description
    });
    
    return NextResponse.json({ success: true, data: blog }, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create blog post" }, 
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ 
      success: true, 
      data: blogs 
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ 
      success: false, 
      data: [],
      error: "Failed to fetch blogs" 
    }, { 
      status: 500 
    });
  }
}