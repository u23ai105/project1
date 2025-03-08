import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import User from '../../../models/User';
import { connectDB } from '../../../lib/db';

export async function GET(request) {
  await connectDB();

  try {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token) 
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) 
      return NextResponse.json({ error: 'User not found' }, { status: 404 });

    return NextResponse.json({ cart: user.cart });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  await connectDB();

  try {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token) 
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) 
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    
    const reqData = await request.json();
    
    // Convert numeric fields to strings for saving
    const serviceId = reqData.serviceId;
    const title = reqData.title;
    const actualprice = String(reqData.actualprice);
    const discountedprice = String(reqData.discountedprice);
    const image = reqData.image;
    const bookingDate = reqData.bookingDate;
    const bookingTime = reqData.bookingTime;
    const quantity = String(reqData.quantity);
    
    console.log('Received data:', { serviceId, title, actualprice, discountedprice, image, bookingDate, bookingTime, quantity });
    
    const existingItemIndex = user.cart.findIndex(item => item.serviceId.toString() === serviceId);
    
    if (existingItemIndex !== -1) {
      // Replace the entire existing subdocument,
      // converting updated quantity to string by adding as numbers then converting
      const newQuantity =
        String(Number(user.cart[existingItemIndex].quantity || 0) + Number(quantity));
      user.cart.splice(existingItemIndex, 1, {
        serviceId,
        title,
        actualprice,
        discountedprice,
        image,
        bookingDate,
        bookingTime,
        quantity: newQuantity,
        status: "pending"
      });
    } else {
      user.cart.push({
        serviceId,
        title,
        actualprice,
        discountedprice,
        image,
        bookingDate,
        bookingTime,
        quantity,
        status: "pending"
      });
    }
    
    await user.save();
    
    console.log('Updated cart:', user.cart.map(item => item.toObject ? item.toObject() : item));
    
    return NextResponse.json({ message: 'Service added to cart', cart: user.cart });
  } catch (error) {
    console.error('Error adding service to cart:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  await connectDB();

  try {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token) 
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) 
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    
    const reqData = await request.json();
    const serviceId = reqData.serviceId;
    // If quantity is provided, convert it to a string
    const quantity = reqData.quantity ? String(reqData.quantity) : undefined;
    const bookingDate = reqData.bookingDate;
    const bookingTime = reqData.bookingTime;
    
    console.log('Received update data:', { serviceId, quantity, bookingDate, bookingTime });
    
    const item = user.cart.find(item => item.serviceId.toString() === serviceId);
    if (!item) 
      return NextResponse.json({ error: 'Service not found in cart' }, { status: 404 });
    
    if (quantity !== undefined) item.quantity = quantity;
    if (bookingDate) item.bookingDate = bookingDate;
    if (bookingTime) item.bookingTime = bookingTime;
    
    await user.save();
    
    console.log('Updated cart:', user.cart);
    
    return NextResponse.json({ message: 'Cart updated', cart: user.cart });
  } catch (error) {
    console.error('Error updating cart:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  await connectDB();

  try {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token) 
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) 
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    
    const { serviceId } = await request.json();
    
    user.cart = user.cart.filter(item => item.serviceId.toString() !== serviceId);
    await user.save();
    
    return NextResponse.json({ message: 'Service removed from cart', cart: user.cart });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}