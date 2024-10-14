"use client";
import React from "react";
import Landing from "./components/Landing";
import RecieptOCR from "./components/RecieptOCR";
import Onboarding from "./components/Onboarding";
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
