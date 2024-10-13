import { useState } from 'react';

export default function ReceiptOCR() {
  const [receiptData, setReceiptData] = useState(null);
  const [summary, setSummary] = useState(null);

  const handleUpload = async (event) => {
    event.preventDefault();

    const file = event.target.image.files[0];
    if (!file) {
      alert('Please select an image file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('api-key', 'your-api-key');
    formData.append('recognizer', 'auto');
    formData.append('ref_no', 'oct_python_123');

    try {
      const response = await fetch('https://ocr.asprise.com/api/v1/receipt', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      const receipt = responseData.receipts[0];
      const ocrText = receipt.ocr_text || '';

      setReceiptData({
        name: ocrText.match(/Name:\s*(.*)/)?.[1] || 'N/A',
        address: ocrText.match(/Address:\s*(.*)/)?.[1] || 'N/A',
        date: ocrText.match(/Date:\s*(.*)/)?.[1] || new Date().toLocaleDateString(),
        services: ocrText.includes('Amoxicillin Cap#21') ? 'Amoxicillin Cap#21' : 'Other',
        totalAmount: '200', // Example amount
        status: 'Paid',
      });

      // Simulate Gemini API for summary generation
      const summaryResponse = await fetch('https://api.your-gemini-endpoint.com/generate-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer your-api-key`,
        },
        body: JSON.stringify({ text: ocrText }),
      });

      if (!summaryResponse.ok) {
        throw new Error(`HTTP error! status: ${summaryResponse.status}`);
      }

      const summaryData = await summaryResponse.json();
      setSummary(summaryData.summary || 'No summary available.');
    } catch (error) {
      console.error('Error processing the receipt:', error);
      alert('Failed to process the receipt. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Eliminate Receipt Chaos</h1>
        <p className="text-lg text-gray-600 mb-6">
          Digitize and organize your receipts using A.I. Generate reports instantly.
        </p>

        <div className="flex items-center gap-4 mb-6">
          <div className="text-xl text-gray-700">4.8 Rating</div>
        </div>

        <form id="uploadForm" onSubmit={handleUpload} className="flex flex-col items-start gap-4">
          <label htmlFor="image" className="px-6 py-3 bg-teal-800 text-white font-bold rounded cursor-pointer hover:bg-teal-600">
            Select Image
          </label>
          <input type="file" id="image" name="image" accept="image/*" className="hidden" />

          <button type="submit" className="px-6 py-3 bg-teal-800 text-white font-bold rounded hover:bg-teal-600">
            Upload
          </button>
        </form>

        {receiptData && (
          <div className="bg-white p-6 mt-8 shadow rounded-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Billing Details</h2>
            <div className="flex flex-col gap-2">
              <div>Bill To: {receiptData.name}</div>
              <div>Date: {receiptData.date}</div>
              <div>Address: {receiptData.address}</div>
              <div>Services: {receiptData.services}</div>
              <div>Total: ${receiptData.totalAmount}</div>
              <div>Status: {receiptData.status}</div>
            </div>
          </div>
        )}

        {summary && (
          <div className="bg-gray-50 p-6 mt-6 shadow rounded-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Summary Report</h2>
            <p>{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}
