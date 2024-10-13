"use client"
import { useState } from 'react';

export default function UploadPrescription() {
  const [details, setDetails] = useState(null);
  const [calendarDate, setCalendarDate] = useState(null);

  const handleSubmit = async (event:any) => {
    event.preventDefault();

    const imageInput = document.getElementById('image');
    const file = imageInput.files[0];

    if (!file) {
      alert('Please select an image file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('api-key', 'TEST'); // Replace with your actual API key
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

      // Display details
      const ocrText = responseData.receipts[0].ocr_text;
      setDetails(ocrText);

      // Extract date for calendar (for demonstration, assuming date is included in OCR text)
      const extractedDate = extractDateFromText(ocrText);
      if (extractedDate) {
        setCalendarDate(extractedDate);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing the request.');
    }
  };

  function extractDateFromText(text:any) {
    const datePattern = /\b(\d{2}-\d{2}-\d{2})\b/; // Adjust regex based on expected date format
    const match = text.match(datePattern);
    return match ? match[0] : null;
  }

  return (
    <div className="flex flex-col items-center bg-teal-900 text-white min-h-screen p-6">
      <div className="container max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8">
        <h1 className="text-center text-2xl md:text-4xl font-bold col-span-full">
          Upload Prescriptions
        </h1>

        <div className="bg-white text-black p-6 rounded-lg shadow-lg">
          <form id="uploadForm" onSubmit={handleSubmit} className="space-y-4">
            <label htmlFor="image" className="cursor-pointer flex items-center justify-center bg-teal-700 hover:bg-teal-800 text-white py-3 rounded-lg transition">
              <img src="https://cdn-icons-png.flaticon.com/512/1375/1375106.png" alt="Image Icon" className="w-6 h-6 mr-2" />
              CHOOSE FROM GALLERY
            </label>
            <input type="file" id="image" name="image" accept="image/*" className="hidden" required />

            <button type="submit" className="bg-teal-700 hover:bg-teal-800 text-white py-3 rounded-lg w-full transition">
              SUBMIT
            </button>
          </form>
        </div>

        <div className="bg-white text-black p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">
            Make sure the prescription you upload contains the following elements:
          </h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <img src="https://tse1.mm.bing.net/th?id=OIP.f_xTjeYbEhaQr4ABcdS8HQHaHa&pid=Api&P=0&h=180" alt="Doctor Icon" className="w-6 h-6 mr-2" />
              Doctor Details
            </li>
            <li className="flex items-center">
              <img src="https://tse3.mm.bing.net/th?id=OIP.c_uSyIgUeo8H4O9T5leRGAAAAA&pid=Api&P=0&h=180" alt="Date Icon" className="w-6 h-6 mr-2" />
              Date of Prescription
            </li>
            <li className="flex items-center">
              <img src="https://cdn-icons-png.flaticon.com/512/172/172835.png" alt="Medicine Icon" className="w-6 h-6 mr-2" />
              Medicine Details
            </li>
            <li className="flex items-center">
              <img src="https://cdn-icons-png.flaticon.com/512/6449/6449621.png" alt="Patient Icon" className="w-6 h-6 mr-2" />
              Patient Details
            </li>
            <li className="flex items-center">
              <img src="https://cdn-icons-png.flaticon.com/512/202/202347.png" alt="Size Icon" className="w-6 h-6 mr-2" />
              Maximum File Size: 10 MB
            </li>
          </ul>
        </div>

        <div className="bg-white text-black p-6 rounded-lg shadow-lg flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4">View Sample Prescription below:</h3>
          <img src="https://themdjourney.com/wp-content/uploads/2021/07/example-of-a-prescription.png" alt="Sample Prescription" className="rounded-lg shadow-lg w-full max-w-xs" />
        </div>
      </div>

      {details && (
        <div id="detailsCard" className="bg-teal-100 text-black p-6 rounded-lg shadow-lg mt-8 w-full max-w-xl">
          <div className="font-semibold mb-4">Prescription Details</div>
          <pre className="bg-gray-100 p-4 rounded-lg">{details}</pre>
        </div>
      )}
    </div>
  );
}
