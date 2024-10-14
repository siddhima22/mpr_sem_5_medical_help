"use client";
import Image from "next/image";
import Link from "next/link"; // Import Link for navigation
import profile from '../public/profile.png';
import fitbit from '../public/fitbit.png';  
import calendar from '../public/calendar.png';
import medicine from '../public/medicine.png';
import bill from '../public/bill.png';
import caloriecalc from '../public/caloriecalc.png';

export default function Decide() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <h1 className="text-2xl font-semibold mb-8 text-gray-800"> Select Option</h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-1 gap-8 w-full max-w-4xl">
        
        {/* Profile */}
        <Link href="/profile">
          <div className="bg-blue-200 shadow-md rounded-lg flex flex-col items-center p-6 cursor-pointer">
            <Image
              src={profile}
              alt="Profile"
              width={100}
              height={100}
              className="mb-4"
            />
            <p className="text-lg font-medium text-gray-700">Profile</p>
          </div>
        </Link>

        {/* Fitbit */}
        <Link href="/fitbit">
          <div className="bg-red-200 shadow-md rounded-lg flex flex-col items-center p-6 cursor-pointer">
            <Image
              src={fitbit}
              alt="Fitbit"
              width={100}
              height={100}
              className="mb-4"
            />
            <p className="text-lg font-medium text-gray-700">Fitbit</p>
          </div>
        </Link>

        {/* Prescription */}
        <Link href="/prescription">
          <div className="bg-gray-200 shadow-md rounded-lg flex flex-col items-center p-6 cursor-pointer">
            <Image
              src={medicine}
              alt="Prescription"
              width={100}
              height={100}
              className="mb-4"
            />
            <p className="text-lg font-medium text-gray-700">Prescription</p>
          </div>
        </Link>

        {/* Calendar */}
        <Link href="/calendar">
          <div className="bg-green-200 shadow-md rounded-lg flex flex-col items-center p-6 cursor-pointer">
            <Image
              src={calendar}
              alt="Calendar"
              width={100}
              height={100}
              className="mb-4"
            />
            <p className="text-lg font-medium text-gray-700">Calendar</p>
          </div>
        </Link>

        {/* Billing */}
        <Link href="/billingdetails">
          <div className="bg-yellow-200 shadow-md rounded-lg flex flex-col items-center p-6 cursor-pointer">
            <Image
              src={bill}
              alt="Billing"
              width={100}
              height={100}
              className="mb-4"
            />
            <p className="text-lg font-medium text-gray-700">Billing</p>
          </div>
        </Link>

        {/* History */}
        <Link href="/calorie">
          <div className="bg-purple-200 shadow-md rounded-lg flex flex-col items-center p-6 cursor-pointer">
            <Image
              src={caloriecalc} // Add the appropriate image source
              alt="Calorie count"
              width={100}
              height={100}
              className="mb-4"
            />
            <p className="text-lg font-medium text-gray-700">Calorie</p>
          </div>
        </Link>

      </div>
    </div>
  );
}
