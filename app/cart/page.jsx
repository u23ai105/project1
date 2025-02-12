'use client'

import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useCookies } from 'react-cookie'

export default function CartPage() {
  const [cart, setCart] = useState([])
  const [cookies] = useCookies(['token'])

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('/api/cart', {
          headers: {
            Authorization: `Bearer ${cookies.token}`
          }
        })
        const data = await response.json()
        setCart(data.cart)
      } catch (error) {
        console.error("Error fetching cart items:", error)
      }
    }

    fetchCartItems()
  }, [cookies.token])

  const calculateTotal = (items) => {
    const total = items.reduce((acc, item) => acc + item.price, 0)
    const totalDiscount = items.reduce((acc, item) => acc + item.discount, 0)
    const totalCost = total - totalDiscount
    return { total, totalDiscount, totalCost }
  }

  const { total, totalDiscount, totalCost } = calculateTotal(cart)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <h1 className="text-2xl font-bold mb-4">Cart</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="border-b py-2">Item</th>
                <th className="border-b py-2">Price</th>
                <th className="border-b py-2">Discount</th>
                <th className="border-b py-2">Final Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td className="border-b py-2">{item.title}</td>
                  <td className="border-b py-2">{item.price} INR</td>
                  <td className="border-b py-2">{item.discount} INR</td>
                  <td className="border-b py-2">{item.price - item.discount} INR</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Payment Details</h2>
            <p className="mb-1">Total Price: {total} INR</p>
            <p className="mb-1">Total Discount: {totalDiscount} INR</p>
            <p className="mb-1">Total Savings: {totalDiscount} INR</p>
            <p className="font-bold">Total Amount to Pay: {totalCost} INR</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}