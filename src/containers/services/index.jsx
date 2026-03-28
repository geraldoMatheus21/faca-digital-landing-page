"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Facebook, Instagram, Youtube, Linkedin, TrendingUp, BarChart2, Users, MessageCircle, Palette, Code, Globe, Eye, Briefcase, Camera, Smartphone } from 'lucide-react';
import "./services.css";   // ← único arquivo de estilo

export default function Services() {
  return (
    <main id="services" className="services-wrapper">
      <h1 className="services-title">
        Nossos Serviços
      </h1>
      <p className="services-subtitle">
        Oferecemos uma variedade de serviços que vão ajudar a sua marca a se sobresair no digital e no físico.
      </p>

      <div className="services-grid">
        <ServiceCard
          title="Gerenciamento de Mídias Sociais"
          description="Cuidamos da sua presença nas redes sociais em todas as principais plataformas, garantindo conteúdo consistente e atrativo."
          icon={<MessageCircle className="h-6 w-6" />}
          platforms={[
            { name: "Facebook", icon: <Facebook className="h-5 w-5" /> },
            { name: "Instagram", icon: <Instagram className="h-5 w-5" /> },
            { name: "YouTube", icon: <Youtube className="h-5 w-5" /> },
          ]}
        />
        {/* ... outros ServiceCards iguais ... */}
      </div>
    </main>
  );
}

// ServiceCard permanece exatamente como estava
function ServiceCard({ title, description, icon, platforms }) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(false);
  const [hoveredItems, setHoveredItems] = useState({});

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Card 
      className="flex flex-col h-full"
      style={{
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered 
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)' 
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader>
        <div 
          style={{
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
            backgroundColor: '#a8d103',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem',
            transform: hoveredIcon ? 'scale(1.15) rotate(8deg)' : 'scale(1) rotate(0deg)',
            boxShadow: hoveredIcon ? '0 8px 16px rgba(168, 209, 3, 0.3)' : 'none',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={() => setHoveredIcon(true)}
          onMouseLeave={() => setHoveredIcon(false)}
        >
          {icon}
        </div>
        <CardTitle style={{ fontSize: '1.25rem', fontWeight: 700 }}>{title}</CardTitle>
        <CardDescription className="text-justify">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <h3 style={{ 
          fontWeight: 600, 
          marginBottom: '0.75rem',
          fontSize: '0.875rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: '#4a5568'
        }}>
          Serviços:
        </h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {platforms.map((platform, index) => (
            <li 
              key={index} 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '0.75rem',
                transform: hoveredItems[index] ? 'translateX(8px)' : 'translateX(0)',
                transition: 'all 0.2s ease',
                padding: '0.25rem 0',
              }}
              onMouseEnter={() => setHoveredItems(prev => ({ ...prev, [index]: true }))}
              onMouseLeave={() => setHoveredItems(prev => ({ ...prev, [index]: false }))}
            >
              <span style={{ 
                color: '#a8d103',
                transform: hoveredItems[index] ? 'scale(1.2)' : 'scale(1)',
                transition: 'all 0.2s ease',
              }}>
                {platform.icon}
              </span>
              <span>{platform.name}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <button
          className="w-full text-background"
          style={{
            backgroundColor: '#a8d103',
            transform: hoveredButton ? 'scale(1.05)' : 'scale(1)',
            boxShadow: hoveredButton ? '0 10px 25px rgba(168, 209, 3, 0.4)' : 'none',
            transition: 'all 0.3s ease',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer'
          }}
          onMouseEnter={() => setHoveredButton(true)}
          onMouseLeave={() => setHoveredButton(false)}
          onClick={scrollToContact}
        >
          Saiba Mais
        </button>
      </CardFooter>
    </Card>
  );
}