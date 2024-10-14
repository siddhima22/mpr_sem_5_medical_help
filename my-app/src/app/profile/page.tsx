"use client";
import { useState } from 'react';
import { Activity, Heart, Plus, Upload, User } from 'lucide-react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('days');

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 p-4">
      <div className="max-w-md mx-auto space-y-4">
        <div className="flex justify-between items-center">
          <User className="h-8 w-8" />
          <Activity className="h-8 w-8" />
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 relative">
              <div className="absolute inset-0 rounded-full bg-blue-200 flex items-center justify-center">
                <span className="text-4xl font-bold text-blue-600">7</span>
              </div>
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="transparent"
                  className="text-blue-100"
                />
                <circle
                  cx="48"
                  cy="48"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray="226.08"
                  strokeDashoffset="56.52"
                  className="text-blue-600"
                />
              </svg>
            </div>
            <h2 className="text-xl">Keep it up, you're doing great!</h2>
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <span>Steps Today</span>
              <span className="font-bold">5,674</span>
            </div>
            <div className="w-full h-2 bg-purple-100 rounded">
              <div className="h-full bg-purple-600 rounded" style={{ width: '56%' }}></div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span>Calories Burned</span>
              <span className="font-bold">1,107 kcal</span>
            </div>
            <div className="w-full h-2 bg-red-100 rounded">
              <div className="h-full bg-pink-400 rounded" style={{ width: '73%' }}></div>
            </div>
          </div>
        </div>

        <div className="flex justify-between bg-white shadow-md rounded-lg">
          <button
            className={`flex-1 p-2 text-center ${activeTab === 'days' ? 'bg-blue-600 text-white' : 'text-blue-600'}`}
            onClick={() => setActiveTab('days')}
          >
            Days
          </button>
          <button
            className={`flex-1 p-2 text-center ${activeTab === 'weeks' ? 'bg-blue-600 text-white' : 'text-blue-600'}`}
            onClick={() => setActiveTab('weeks')}
          >
            Weeks
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          {activeTab === 'days' ? (
            <>
              <div className="flex justify-between items-center">
                <span>Steps Today</span>
                <span className="font-bold">5,674</span>
              </div>
              <div className="w-full h-2 bg-blue-100 rounded">
                <div className="h-full bg-blue-600 rounded" style={{ width: '56%' }}></div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span>Calories Burned</span>
                <span className="font-bold">1,107 kcal</span>
              </div>
              <div className="w-full h-2 bg-blue-100 rounded">
                <div className="h-full bg-blue-600 rounded" style={{ width: '73%' }}></div>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <span>Weekly Goal</span>
                <span className="font-bold">4/7 days</span>
              </div>
              <div className="w-full h-2 bg-blue-100 rounded">
                <div className="h-full bg-blue-600 rounded" style={{ width: '57%' }}></div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span>Avg. Daily Steps</span>
                <span className="font-bold">6,234</span>
              </div>
              <div className="w-full h-2 bg-blue-100 rounded">
                <div className="h-full bg-blue-600 rounded" style={{ width: '62%' }}></div>
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-sm font-medium">Blood Pressure</h3>
            <div className="flex items-center">
              <Heart className="h-4 w-4 text-red-500 mr-2" />
              <span className="text-2xl font-bold">120/80</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Last checked: 2h ago</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h3 className="text-sm font-medium">Weight Goal</h3>
            <div className="text-2xl font-bold">58 kg</div>
            <p className="text-xs text-gray-500 mt-1">Current: 62 kg</p>
          </div>
        </div>

        <button className="w-full bg-green-100 text-black py-2 rounded flex items-center justify-center">
          <Upload className="mr-2 h-4 w-4" /> Upload Health Data
        </button>

        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-lg">Recommendations</h3>
          <button className="w-full border border-blue-600 text-blue-600 py-2 rounded flex items-center justify-center">
            <Plus className="mr-2 h-4 w-4" /> Get Personalized Tips
          </button>
        </div>
      </div>
    </div>
  );
}

