"use client";

import Image from "next/image";
import Logo from "../../../public/logo2.png";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center p-8">
      <div className="flex flex-col items-center gap-4">
        <Image 
          src={Logo} 
          alt="Faça Digital" 
          className="w-32 md:w-40 lg:w-48" 
        />
        <h1 className="text-3xl font-bold text-center">
          faça digital
        </h1>
      </div>
    </footer>
  );
}