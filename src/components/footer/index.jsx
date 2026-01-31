"use client";

import Image from "next/image";
import Logo from "../../../public/logo2.png";
import Link from "next/link";
import { RiFacebookBoxFill, RiInstagramFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FaSquareWhatsapp } from "react-icons/fa6";

export default function Footer() {
  const scrollToSection = (id) => {
    let element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  return (
    <footer className="flex flex-col lg:flex-row justify-around items-center text-center lg:text-start p-4 md:p-6 mx-auto my-10 gap-10 lg:gap-0">
      <div className="flex items-center gap-2">
        <Image src={Logo} alt="Faça Digital" className="w-24 lg:w-32 xl:w-48" />
        <h1 className="text-3xl font-bold">faça<br />digital</h1>
      </div>

      <div className="flex flex-col gap-4">
        <button className="hover:text-that-green transition duration-100 uppercase text-center" onClick={() => scrollToSection('works')}>nossos<br />serviços</button>
        <button className="hover:text-that-green transition duration-100 uppercase text-center" onClick={() => scrollToSection('works')}>trabalhos<br />realizados</button>
        <button className="hover:text-that-green transition duration-100 uppercase text-center" onClick={() => scrollToSection('about')}>sobre<br />nós</button>
        <button className="hover:text-that-green transition duration-100 uppercase text-center" onClick={() => scrollToSection('contact')}>entre em<br />contato</button>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-lg">Nos siga nas nossas <span className="text-that-green">redes sociais</span></h2>
        <div className="flex gap-2 items-center w-full justify-between">
          <Link href={'https://www.instagram.com/facadigital/'} target="_blank" rel="noopener noreferrer" className="flex gap-2 items-center w-fit">
            <RiInstagramFill className="w-8 h-8" />
            <p className="text-that-green">Instagram</p>
          </Link>

          <Link href={'https://www.facebook.com/facadigital/'} target="_blank" rel="noopener noreferrer" className="flex gap-2 items-center w-fit">
            <RiFacebookBoxFill className="w-8 h-8" />
            <p className="text-that-green">Facebook</p>
          </Link>
        </div>

        <h2 className="text-lg">Ou entre em contato pelo nosso <span className="text-that-green">Whatsapp</span></h2>
        <div className="flex gap-2 items-center justify-center lg:justify-start">
          <FaSquareWhatsapp className="w-8 h-8" />
          <p className="text-that-green">(21) 98769-1234</p>
        </div>

        <h2 className="text-lg">Ou então pelo nosso <span className="text-that-green">e-mail</span></h2>
        <div className="flex gap-2 items-center justify-center lg:justify-start">
          <MdEmail className="w-8 h-8" />
          <p className="text-that-green">contato@facadigital.com.br</p>
        </div>
      </div>
    </footer>
  );
}
