"use client";
// Main Billing Component
import { useState } from "react";
import Tesseract from "tesseract.js";
import Drawer from "./Drawer"; // Assuming Drawer component is in the same directory

export default function Billing() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [bills, setBills] = useState([
    { id: "BILL00124", name: "Booking fee", amount: "$20.00", status: "PAID" },
    { id: "BILL00126", name: "Treatment fee", amount: "$255.00", status: "UNPAID" },
  ]);
  const [fileData, setFileData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setFileData(null);
    setIsProcessing(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileData(file);
  };

  const handleUploadBill = async () => {
    if (fileData) {
      setIsProcessing(true);

      // Perform OCR on the selected file using Tesseract
      Tesseract.recognize(fileData, "eng", {
        logger: (m) => console.log(m), // For logging OCR process
      }).then(({ data: { text } }) => {
        console.log(text); // This is the extracted text from the image

        // Simulating extracting details from OCR text
        const extractedDetails = extractBillDetails(text);

        const newBill = {
          id: `BILL${Math.floor(Math.random() * 100000)}`,
          name: fileData.name.replace(/\.[^/.]+$/, ""), // Bill name derived from file name
          amount: extractedDetails.amount || "$100.00", // Extracted amount or fallback
          status: "UNPAID",
        };

        // Adding the new bill to the bills array
        setBills((prevBills) => [...prevBills, newBill]);

        // Store bills in localStorage (simulated)
        localStorage.setItem("bills", JSON.stringify([...bills, newBill]));

        setIsProcessing(false);
        closeModal(); // Close modal after uploading
      });
    }
  };

  // Simulate extraction logic from OCR text
  const extractBillDetails = (text) => {
    // Example: You can enhance this to better parse OCR text for details
    const lines = text.split("\n").filter((line) => line.trim() !== "");
    const amountLine = lines.find((line) => line.includes("$")) || "";
    const amount = amountLine.match(/\$[0-9,.]+/)?.[0] || "$100.00";

    return {
      amount,
    };
  };

  const openDrawer = (bill) => {
    setSelectedBill(bill);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedBill(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-4 relative">
      {/* Billing Details */}
      <div className="bg-white w-full max-w-md rounded-lg shadow p-4 mb-16">
        <h1 className="text-lg font-semibold mb-4">Bill Details</h1>

        {/* Bill Items */}
        <div className="space-y-4">
          {bills.map((bill) => (
            <div
              key={bill.id}
              className="flex justify-between items-center bg-gray-200 rounded-lg p-4 cursor-pointer"
              onClick={() => openDrawer(bill)} // Open drawer on click
            >
              <div>
                <p className="font-semibold">{bill.name}</p>
                <p className="text-sm text-gray-500">Bill ID: #{bill.id}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{bill.amount}</p>
                <p
                  className={`text-sm font-bold px-2 py-1 rounded-md ${
                    bill.status === "PAID"
                      ? "bg-green-100 text-green-600 border border-green-600 border-radius-lg"
                      : "bg-red-100 text-red-600  border border-red-600 border-radius-lg"
                  }`}
                >
                  {bill.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Bill Button - positioned bottom right */}
      <button
        onClick={openModal}
        className="bg-blue-500 text-white rounded-full p-3 fixed bottom-4 right-4 shadow-lg w-12 h-12 flex items-center justify-center"
      >
        <span className="text-2xl font-bold">+</span>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 space-y-4 w-80">
            <h2 className="text-xl font-semibold text-center">Upload Bill</h2>

            {/* File upload buttons */}
            <div className="space-y-4">
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full bg-gray-200 p-2 rounded-md text-gray-700"
              />
              <button
                onClick={handleUploadBill}
                className="w-full bg-blue-500 text-white p-2 rounded-md"
                disabled={!fileData || isProcessing} // Disable if no file is selected or processing
              >
                {isProcessing ? "Processing..." : "Upload Bill"}
              </button>
              <button
                onClick={closeModal}
                className="w-full bg-red-500 text-white p-2 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Drawer Component */}
      {isDrawerOpen && <Drawer bill={selectedBill} onClose={closeDrawer} />}
    </div>
  );
}
