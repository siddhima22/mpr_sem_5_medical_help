"use client";

import Image from 'next/image';
import Link from 'next/link'; // Import Link from next/link
import landing from '../public/landing.png';

export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-100 to-green-300">
      <div className="flex flex-col items-center w-full max-w-md p-4">
        <Image 
          src={landing}
          alt="Delivery Man" 
          width={300} 
          height={300} 
        />
        <h1 className="text-4xl font-bold text-center text-black mt-8">Healthcare at your Fingertips</h1>
        <p className="text-lg text-black text-center mt-4">Enter your health details to get personalized medical services.</p>
        <Link href="/onboarding">  {/* Use Link component for navigation */}
          <button 
            className="mt-6 px-6 py-3 bg-black text-white rounded-full text-lg"
          >
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}
