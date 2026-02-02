import Email from "@/components/email";
import Link from "next/link";
import { FaLocationDot, FaSquareWhatsapp } from "react-icons/fa6";
import { RiInstagramFill, RiFacebookBoxFill } from "react-icons/ri";
import './index.css';

export default function Contact() {
  return (
    <main id="contact" className="contact-container">
      <div className="contact-header">
        <h1 className="contact-title">Entre em Contato</h1>
        <p className="contact-subtitle">
          Estamos prontos para te ouvir e ajudar sua marca a conquistar espaço nas redes.
        </p>
      </div>

      <div className="contact-content">
        {/* FORMULÁRIO */}
        <div className="contact-form-section">
          <Email />
        </div>

        {/* CONTATOS - ABAIXO DO FORMULÁRIO */}
        <div className="contact-channels-section">
          <h2 className="contact-channels-title">
            Ou entre em contato pelos <span>canais</span> abaixo
          </h2>
          
          <div className="contact-channels-grid">
            <Link 
              href={'https://www.instagram.com/facadigital/'} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="contact-channel-link"
            >
              <RiInstagramFill className="contact-channel-icon" />
              <p className="contact-channel-text">Instagram</p>
            </Link>

            <Link 
              href={'https://www.facebook.com/facadigital/'} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="contact-channel-link"
            >
              <RiFacebookBoxFill className="contact-channel-icon" />
              <p className="contact-channel-text">Facebook</p>
            </Link>

            <Link 
              href={'https://wa.me/+5521987691234'} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="contact-channel-link"
            >
              <FaSquareWhatsapp className="contact-channel-icon" />
              <p className="contact-channel-text">(21) 98769-1234</p>
            </Link>
          </div>
        </div>
        <div className="contact-contacts-section">
          <h2 className="contact-channels-title">
          </h2>
          <div className="contact-address-section">
            <h2 className="contact-address-title">
              Ou ainda, você pode nos encontrar no seguinte <span>endereço</span>
            </h2>
            <div className="contact-address-info">
              <FaLocationDot className="contact-address-icon" />
              <p className="contact-address-text">
                R. Dona Maria Emiliana - Várzea Alegre, Guapimirim - RJ
              </p>
            </div>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6191.702085892772!2d-43.02401478751684!3d-22.66839635693847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x99a3dfdee10e6f%3A0x1913bbf062ec3be0!2sFa%C3%A7a%20Digital!5e0!3m2!1spt-BR!2sbr!4v1736817899003!5m2!1spt-BR!2sbr"
              className="contact-map"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização da Faça Digital"
            />
          </div>
        </div>
      </div>
    </main>
  );
}