"use client"; // Indicates that this component is a client component
import { useEffect, useState } from "react";
import { CheckCircle, CreditCard, Share2, Star, Home } from "lucide-react"; // Import Home icon
import Link from "next/link"; // Import Link for navigation

export default function success() {
  const [paymentAmount, setPaymentAmount] = useState(0);
  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date()); // Formatting the date

  useEffect(() => {
    // Retrieve the payment amount from local storage
    const amount = localStorage.getItem("paymentAmount");
    if (amount) {
      setPaymentAmount(amount); // Set the state with the amount retrieved
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg relative">
        {/* Home icon with redirect */}
        <div className="absolute top-4 right-4 text-center">
          <Link href="/decide">
            <div className="flex flex-col items-center cursor-pointer">
              <Home className="w-6 h-6 text-black" /> {/* Home Icon */}
              <span className="text-xs text-gray-500">Home</span> {/* Home Text */}
            </div>
          </Link>
        </div>

        <div className="text-center p-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold">Payment Successful</h2>
          <p className="text-gray-500">{today}</p>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <h3 className="font-semibold">Transaction Details</h3>
            <p className="text-sm text-gray-500">Service: Health Care</p>
            <p className="text-sm text-gray-500">Provider: Hospital</p>
          </div>
          <hr className="my-4" />
          <div className="space-y-2">
            <h3 className="font-semibold">Payment Information</h3>
            <div className="flex justify-between text-sm">
              <span>Transaction ID</span>
              <span>#TRX12345</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Order ID</span>
              <span>#ORD67890</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Payment Method</span>
              <span className="flex items-center">
                <CreditCard className="w-4 h-4 mr-2" />
                **** **** **** 1234
              </span>
            </div>
          </div>
          <hr className="my-4" />
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${paymentAmount}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>$10.00</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${(parseFloat(paymentAmount) + 10).toFixed(2)}</span> {/* Assuming $10 is tax */}
            </div>
          </div>
        </div>
        <div className="flex justify-between p-6">
          <button className="flex items-center border border-gray-300 rounded px-4 py-2">
            <Share2 className="w-4 h-4 mr-2" />
            Share Receipt
          </button>
          <button className="flex items-center border border-gray-300 rounded px-4 py-2">
            <Star className="w-4 h-4 mr-2" />
            Rate Service
          </button>
        </div>
      </div>
    </div>
  );
}
