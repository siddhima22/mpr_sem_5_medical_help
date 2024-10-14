"use client";
import { useState } from 'react';

export default function UploadPrescription() {
  const [details, setDetails] = useState(null);
  const [calendarDate, setCalendarDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const defaultPrescription = {
    medicine: "Amoxicillin 500mg cap #21",
    dosage: "1 cap 6 times a day for seven days",
    imageUrl: "https://api.watsons.com.ph/medias/prdthumb-front-10000367.jpg?context=bWFzdGVyfGltYWdlc3wyNzY3NzB8aW1hZ2UvanBlZ3xoYzcvaGNiLzExMjI0NjE5Njc5Nzc0L1dUQ1BILTEwMDAwMzY3LWZyb250LmpwZ3wxMTQ0NDhkZDAzNGYzZGE4YTQ2MzY3OTYzY2Y0ODZhZjc5N2JlZjI1YjM3ODgxZGM4YmVjZDAzYjRmOWU2Zjlj", // Replace with the actual image URL
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const imageInput = document.getElementById('image') as HTMLInputElement;
    const file = imageInput.files[0];

    // Open modal directly without OCR since we have default data
    setIsModalOpen(true);
    setDetails(`${defaultPrescription.medicine}, ${defaultPrescription.dosage}`);

    // Send default prescription data to Gemini AI
    try {
      const response = await fetch('https://gemini.api.url', { // Replace with the actual Gemini API URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_GEMINI_API_KEY', // Replace with your actual API key
        },
        body: JSON.stringify(defaultPrescription),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      // Assuming responseData has a summary and recommendations
      const summary = responseData.summary;
      const recommendations = responseData.recommendations;

      // You can append the summary and recommendations to details
      setDetails(prevDetails => `${prevDetails}\n\nSummary: ${summary}\nRecommendations: ${recommendations}`);

    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while processing the request.');
    }
  };

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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-lg w-full max-h-[80vh] overflow-auto">
            <button
              className="text-red-500 font-bold float-right"
              onClick={() => setIsModalOpen(false)}
            >
              X
            </button>
            <h2 className="font-semibold text-lg mb-4">Prescription Summary</h2>
            <img src={defaultPrescription.imageUrl} alt="Medicine" className=" m-14 w-48 h-48 object-cover rounded-lg mb-4" />
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">
              {details}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
