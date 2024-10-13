"use client";
import React from "react";
import Landing from "./Components/Landing";
import RecieptOCR from "./Components/RecieptOCR";
import PrescriptionOCR from "./Components/PrescriptionOCR";
import Onboarding from "./Components/Onboarding";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

export default function Home() {
  return (
    <div>

      {/* 
      <PrescriptionOCR/> 
      <Onboarding/>
       <RecieptOCR/>
      */}
          <Landing/> 
    </div>
  );
}
