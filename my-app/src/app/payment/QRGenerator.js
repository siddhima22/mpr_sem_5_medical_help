// QRGenerator.js
"use client";
import React from "react";
import QRCode from "qrcode.react";

export default function QRGenerator() {
  const url = `upi://pay?pa=ritojnanm@oksbi&pn=Ritojnan%20Mukherjee&am=${(2).toFixed(2)}&cu=INR&aid=uGICAgMC09snXQQ`;
  return (
    <div>
      <QRCode value={url} />
    </div>
  );
}
