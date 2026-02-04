"use client";

import Image from "next/image";
import Logo from "../../../public/logo2.png";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center p-8">
      <div className="flex flex-row items-center gap-4">
        {/* Logo */}
        <Image 
          src={Logo} 
          alt="Faça Digital" 
          className="w-24 md:w-32 lg:w-40" 
        />
        
        {/* Texto */}
        <h1 className="text-2xl md:text-3xl font-bold">
          faça digital
        </h1>
      </div>
    </footer>
  );
}