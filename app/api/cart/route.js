import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import User from '../../../models/User'
import connectDB from '../../../lib/db'

export async function GET(request) {
  await connectDB()

  const token = request.headers.get('Authorization').split(' ')[1]
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  const user = await User.findById(decoded.userId)

  return NextResponse.json({ cart: user.cart })
}