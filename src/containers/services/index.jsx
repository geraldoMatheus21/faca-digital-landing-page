"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Facebook, Instagram, Youtube, Linkedin, TrendingUp, BarChart2, Users, MessageCircle, Palette, Code, Globe, Eye, Briefcase, Camera, Smartphone } from 'lucide-react';
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Services() {
  const router = useRouter();

  return (
    <main className="container mx-auto p-4 md:p-6" id="services">
      <h1 className="text-4xl font-bold text-center mb-8 uppercase text-white">Nossos Serviços</h1>
      <p className="text-xl text-center text-muted-foreground mb-12 max-w-5xl mx-auto">
        Oferecemos uma variedade de serviços que vão ajudar a sua marca a se sobresair no meio digital.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

        <ServiceCard
          title="Criação de Conteúdo"
          description="Nós produzimos conteúdos personalizados, de qualidade e que conversam com o seu público."
          icon={<Youtube className="h-6 w-6" />}
          platforms={[
            { name: "Imagens", icon: <Instagram className="h-5 w-5" /> },
            { name: "Vídeos", icon: <Youtube className="h-5 w-5" /> },
            { name: "Blogs", icon: <Linkedin className="h-5 w-5" /> },
          ]}
        />

        <ServiceCard
          title="Marketing com Influencers"
          description="Conectamos a sua marca com influencers relevantes para expandir seu alcance e construir credibilidade."
          icon={<Users className="h-6 w-6" />}
          platforms={[
            { name: "Divulgação com Influencer", icon: <MessageCircle className="h-5 w-5" /> },
            { name: "Gerenciamento de Campanha", icon: <TrendingUp className="h-5 w-5" /> },
            { name: "Monitoramento de Performance", icon: <BarChart2 className="h-5 w-5" /> },
          ]}
        />

        <ServiceCard
          title="Criação de Sites"
          description="Nós projetamos e desenvolvemos sites responsivos e de alta conversão, complementando sua presença nas redes sociais."
          icon={<Globe className="h-6 w-6" />}
          platforms={[
            { name: "Design Cutomizado", icon: <Palette className="h-5 w-5" /> },
            { name: "Desenvolvimento Responsivo", icon: <Code className="h-5 w-5" /> },
            { name: "SEO Otimizado", icon: <TrendingUp className="h-5 w-5" /> },
          ]}
        />

        <ServiceCard
          title="Consultoria Digital"
          description="Receba orientações e estratégias que vão ajudar a você e a sua empresa no cenário digital."
          icon={<TrendingUp className="h-6 w-6" />}
          platforms={[
            { name: "Estratégias de Crescimento", icon: <TrendingUp className="h-5 w-5" /> },
            { name: "Integração de Tecnologias", icon: <Globe className="h-5 w-5" /> },
            { name: "Transformação Digital", icon: <Smartphone className="h-5 w-5" /> },
          ]}
        />

        <ServiceCard
          title="Identidade Visual"
          description="Criamos uma identidade visual que se conecta com a sua marca, garantindo uma presença forte e memorável."
          icon={<Eye className="h-6 w-6" />}
          platforms={[
            { name: "Design de Logotipo", icon: <Palette className="h-5 w-5" /> },
            { name: "Diretrizes de Marca", icon: <Briefcase className="h-5 w-5" /> },
            { name: "Criação de Ativos Visuais", icon: <Camera className="h-5 w-5" /> },
          ]}
        />
      </div>
    </main>
  )
}

function ServiceCard({ title, description, icon, platforms }) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(false);
  const [hoveredItems, setHoveredItems] = useState({});

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
        <Button 
          className="w-full text-background"
          style={{
            backgroundColor: '#a8d103',
            transform: hoveredButton ? 'scale(1.05)' : 'scale(1)',
            boxShadow: hoveredButton 
              ? '0 10px 25px rgba(168, 209, 3, 0.4)' 
              : 'none',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={() => setHoveredButton(true)}
          onMouseLeave={() => setHoveredButton(false)}
        >
          <Link href={"/em-construcao"}>
            Saiba Mais
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}