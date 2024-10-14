"use client";
import { useState } from 'react';
import Link from 'next/link'; // Import Link for navigation
import { CreditCard, QrCode } from 'lucide-react';
import QRGenerator from "./QRGenerator"; 

export default function PaymentComponent() {
  const [paymentMethod, setPaymentMethod] = useState('credit-card');

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-align-center " style={{ textAlign: 'center' }}>Payment Details</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="text-center">
            <p className="text-2xl font-bold">$1933.94</p>
            <p className="text-sm text-gray-500">Amount to be paid</p>
          </div>
          <hr />
          <div className="space-y-2">
            <label htmlFor="payment-method" className="block text-sm font-medium">Select Payment Method</label>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="credit-card"
                  name="payment-method"
                  value="credit-card"
                  checked={paymentMethod === 'credit-card'}
                  onChange={() => setPaymentMethod('credit-card')}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="credit-card" className="flex items-center cursor-pointer">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Credit Card
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="upi"
                  name="payment-method"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={() => setPaymentMethod('upi')}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="upi" className="flex items-center cursor-pointer">
                  <QrCode className="mr-2 h-4 w-4" />
                  UPI
                </label>
              </div>
            </div>
          </div>
          {paymentMethod === 'credit-card' ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="card-number" className="block text-sm font-medium">Card Number</label>
                <input
                  id="card-number"
                  placeholder="1234 5678 9012 3456"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="expiry-date" className="block text-sm font-medium">Expiry Date</label>
                  <input
                    id="expiry-date"
                    placeholder="MM/YY"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="cvv" className="block text-sm font-medium">CVV</label>
                  <input
                    id="cvv"
                    placeholder="123"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <QrCode className="w-48 h-48 text-blue-500" />
                <p className="mt-2">Scan to pay with UPI</p>
              </div>
            </div>
          )}
        </div>
        <div className="px-6 py-4 border-t">
          <Link href="/success"> {/* Wrap button in Link */}
            <button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-700 transition">
              Confirm Payment
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

