"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FaUser, FaBirthdayCake, FaVenusMars, FaArrowsAltV, FaWeight } from "react-icons/fa"

export default function Onboarding() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
  })

  const router = useRouter() // Initialize the router

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, gender: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (Object.values(formData).every((value) => value)) {
      // Save form data to local storage
      localStorage.setItem("onboardingData", JSON.stringify(formData))

      console.log("Form submitted:", formData)
      alert("Onboarding Complete: Your information has been successfully submitted.")

      // Redirect to /decide
      router.push("/decide")
    } else {
      alert("Error: Please fill in all fields.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 bg-green-400 text-white">
          <h1 className="text-2xl font-bold">User Onboarding</h1>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          
          {/* Name Field */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-m font-medium text-gray-700 flex items-center">
              <FaUser style={{ color: "blue", margin: "6px" }} /> Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Age Field */}
          <div className="space-y-2">
            <label htmlFor="age" className="block text-m font-medium text-gray-700 flex items-center">
              <FaBirthdayCake style={{ color: "pink", margin: "6px" }} /> Age
            </label>
            <input
              id="age"
              name="age"
              type="number"
              placeholder="Enter your age"
              value={formData.age}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Gender Field */}
          <div className="space-y-2">
            <label htmlFor="gender" className="block text-m font-medium text-gray-700 flex items-center">
              <FaVenusMars style={{ color: "gray", margin: "6px" }} /> Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleGenderChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Height Field */}
          <div className="space-y-2">
            <label htmlFor="height" className="block text-m font-medium text-gray-700 flex items-center">
              <FaArrowsAltV style={{ color: "purple", margin: "6px" }} /> Height (cm)
            </label>
            <input
              id="height"
              name="height"
              type="number"
              placeholder="Enter your height in cm"
              value={formData.height}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Weight Field */}
          <div className="space-y-2">
            <label htmlFor="weight" className="block text-m font-medium text-gray-700 flex items-center">
              <FaWeight style={{ color: "black", margin: "6px" }} /> Weight (kg)
            </label>
            <input
              id="weight"
              name="weight"
              type="number"
              placeholder="Enter your weight in kg"
              value={formData.weight}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-green-400 text-white rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
