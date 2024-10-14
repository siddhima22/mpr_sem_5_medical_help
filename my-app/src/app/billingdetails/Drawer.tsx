"use client"; // Ensure this runs in a client-side environment
import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import Link from "next/link"; // Import Link from next/link

// Component for displaying the bill details from local storage
const Drawer = ({ onClose }) => {
  const [bill, setBill] = useState(null); // Initialize with null
  const [isOpen, setIsOpen] = useState(false); // Track if the drawer is open

  // Initialize bill data if not present in local storage
  useEffect(() => {
    const existingBill = JSON.parse(localStorage.getItem('bill'));
    
    // If no bill data exists, set it to the default billData
    if (!existingBill) {
      const billData = {
        id: 4,
        hospital: "Norwood Hospital",
        date: "06/10/2010",
        uponReceipt: "Upon Receipt FY",
        facility: "A CARITAS FAMILY HOSPITAL",
        patientName: "EN EE",
        services: [
          { date: "05/10/2010", description: "CAT SCAN BODY", amount: 2752.00 },
          { description: "DRUG SPEC ID DETAIL CODING", amount: 474.00 },
          { description: "EMERGENCY ROOM GENERAL", amount: 623.00 },
          { description: "LABORATORY GENERAL", amount: 446.00 },
          { description: "M/S SUPPLY STERILE SUPPLY", amount: 89.00 }
        ],
        totalCharges: 4384.00,
        insuranceDiscounts: -476.10,
        insurancePayments: -1973.96,
        totalPaymentsAdjustments: -2450.06,
        accountBalance: 1933.94
      };
      
      localStorage.setItem('bill', JSON.stringify(billData));
      setBill(billData);
      setIsOpen(true); // Set to true when new bill data is created
    } else {
      setBill(existingBill);
      setIsOpen(true); // Set to true when existing bill data is found
    }
  }, []);

  // Prevent rendering if no bill is found
  if (!bill) return null;

  return (
    <div className={`fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-end animate animation-ease-in duration-10000 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
      <div
        className="bg-white shadow-lg p-4 rounded-t-lg w-full"
        style={{ height: "80vh" }}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold flex items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4400/4400532.png"
              alt="Bill Icon"
              className="w-10 h-10 mr-3"
            />
            Bill Details
          </h2>
          <button onClick={() => { setIsOpen(false); onClose(); }}>
            <FaTimes className="text-lg text-gray-500" />
          </button>
        </div>

        {/* Display Hospital and Patient Details */}
        <div className="mt-4">
          <h3 className="font-semibold text-lg">{bill.hospital}</h3>
          <p className="text-sm text-gray-500">{bill.facility}</p>
          <p className="text-sm text-gray-500">Patient Name: {bill.patientName}</p>
          <p className="text-sm text-gray-500">Date: {bill.date}</p>
          <p className="text-sm text-gray-500">Received: {bill.uponReceipt}</p>
        </div>

        {/* List of Services */}
        <div className="mt-4 space-y-2">
          <p className="text-sm font-semibold">Service Details:</p>
          {bill.services.map((service, index) => (
            <div key={index} className="text-sm flex justify-between">
              <p>{service.date ? `${service.date} - ` : ""}{service.description}</p>
              <p>${service.amount.toFixed(2)}</p>
            </div>
          ))}
        </div>

        {/* Total Charges */}
        <div className="mt-4 border-t pt-2">
          <p className="text-sm">Total Charges: <span className="font-semibold">${bill.totalCharges.toFixed(2)}</span></p>
          <p className="text-sm">Insurance Discounts: <span className="text-red-500">${bill.insuranceDiscounts.toFixed(2)}</span></p>
          <p className="text-sm">Insurance Payments: <span className="text-red-500">${bill.insurancePayments.toFixed(2)}</span></p>
          <p className="text-sm">Total Payments & Adjustments: <span className="text-red-500">${bill.totalPaymentsAdjustments.toFixed(2)}</span></p>
          <p className="font-semibold text-lg">Account Balance: <span className="text-blue-600">${bill.accountBalance.toFixed(2)}</span></p>
        </div>

        {/* Payment Button */}
        <div className="flex justify-center items-center absolute bottom-4 w-full px-4">
          <Link href="/payment" passHref>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
              onClick={() => {
                // Optional: handle any pre-payment actions here
                alert("Payment processed!"); // Alert can be removed if you want
              }}
            >
              Pay ${bill.accountBalance.toFixed(2)}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
