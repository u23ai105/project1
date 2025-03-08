'use client'

import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/navigation'

export default function CartPage() {
  const [cart, setCart] = useState([])
  const [cookies] = useCookies(['token'])
  const router = useRouter();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('/api/cart', {
          headers: {
            Authorization: `Bearer ${cookies.token}`
          }
        })
        if (!response.ok) throw new Error("Failed to fetch cart data")
        const data = await response.json()
        console.log('Fetched cart data:', data)
        setCart(data.cart)
      } catch (error) {
        console.error("Error fetching cart items:", error)
      }
    }
    fetchCartItems()
  }, [cookies.token])

  const handleRemoveFromCart = async (serviceId) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.token}`
        },
        body: JSON.stringify({ serviceId })
      })
      if (!response.ok) throw new Error('Failed to remove service from cart')
      const data = await response.json()
      console.log('Removed from cart:', data)
      setCart(data.cart)
    } catch (error) {
      console.error('Error removing service from cart:', error)
    }
  }

  const handleUpdateQuantity = async (serviceId, quantity) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.token}`
        },
        body: JSON.stringify({ serviceId, quantity })
      })
      if (!response.ok) throw new Error('Failed to update quantity')
      const data = await response.json()
      console.log('Updated quantity:', data)
      setCart(data.cart)
    } catch (error) {
      console.error('Error updating quantity:', error)
    }
  }

  // Function to calculate total price, discount, and final amount
  const calculateTotal = (items) => {
    return items.reduce(
      (acc, item) => {
        acc.total += item.actualprice * item.quantity
        acc.totalDiscount += (item.actualprice - item.discountedprice) * item.quantity
        acc.totalCost += item.discountedprice * item.quantity
        return acc
      },
      { total: 0, totalDiscount: 0, totalCost: 0 }
    )
  }

  const { total, totalDiscount, totalCost } = calculateTotal(cart)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <h1 className="text-2xl font-bold mb-4">Cart</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="border-b py-2">Item</th>
                  <th className="border-b py-2">Qty</th>
                  <th className="border-b py-2">Price</th>
                  <th className="border-b py-2">Discounted Price</th>
                  <th className="border-b py-2">Final Price</th>
                  <th className="border-b py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 flex items-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 object-cover rounded mr-3"
                      />
                      {item.title}
                    </td>
                    <td className="py-2">
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) => handleUpdateQuantity(item.serviceId, parseInt(e.target.value))}
                        className="w-16 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="py-2">{item.actualprice} INR</td>
                    <td className="py-2">{item.discountedprice} INR</td>
                    <td className="py-2">{item.discountedprice * item.quantity} INR</td>
                    <td className="py-2">
                      <button
                        onClick={() => handleRemoveFromCart(item.serviceId)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {cart.length > 0 && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Payment Details</h2>
              <p className="mb-1">Total Price: {total} INR</p>
              <p className="mb-1">Total Discount: {totalDiscount} INR</p>
              <p className="mb-1">Total Savings: {totalDiscount} INR</p>
              <p className="font-bold">Total Amount to Pay: {totalCost} INR</p>
              <button
               className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
               onClick={() => router.push(`/payment?amount=${totalCost}`)}>
            Checkout
           </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}