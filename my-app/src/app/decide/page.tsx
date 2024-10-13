"use client";
import Image from "next/image";
import profile from '../public/profile.png';
import fitbit from '../public/fitbit.png';  
import calendar from '../public/calendar.png';
import medicine from '../public/medicine.png';


export default function Decide() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <h1 className="text-2xl font-semibold mb-8 text-gray-800"> Select Option</h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-1 gap-8 w-full max-w-4xl">
    
        <div className="bg-blue-200 shadow-md rounded-lg flex flex-col items-center p-6">
          <Image
            src={profile}
            alt="Send"
            width={100}
            height={100}
            className="mb-4"
          />
          <p className="text-lg font-medium text-gray-700">Profile</p>
        </div>

        
        <div className="bg-red-200 shadow-md rounded-lg flex flex-col items-center p-6">
          <Image
            src={fitbit}
            alt="Receive"
            width={100}
            height={100}
            className="mb-4"
          />
          <p className="text-lg font-medium text-gray-700">Fitbit </p>
        </div>

          {/* History Box */}
          <div className="bg-gray-200 shadow-md rounded-lg flex flex-col items-center p-6">
          <Image
            src={medicine}
            alt="History"
            width={100}
            height={100}
            className="mb-4"
          />
          <p className="text-lg font-medium text-gray-700">Prescription</p>
        </div>

        {/* Current Box */}
        <div className="bg-green-200 shadow-md rounded-lg flex flex-col items-center p-6">
          <Image
            src={calendar}
            alt="Current"
            width={100}
            height={100}
            className="mb-4"
          />
          <p className="text-lg font-medium text-gray-700">Calendar</p>
        </div>

    

        {/* Track Box */}
        <div className="bg-yellow-200 shadow-md rounded-lg flex flex-col items-center p-6">
          <Image
            src=""
            alt="Track"
            width={100}
            height={100}
            className="mb-4"
          />
          <p className="text-lg font-medium text-gray-700">Billing</p>
        </div>

        {/* Settings Box */}
        <div className="bg-purple-200 shadow-md rounded-lg flex flex-col items-center p-6">
          <Image
            src=""
            alt="Settings"
            width={100}
            height={100}
            className="mb-4"
          />
          <p className="text-lg font-medium text-gray-700">History</p>
        </div>
      </div>
    </div>
  );
}
