"use client";

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
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="w-12 h-12 rounded-full bg-that-green flex items-center justify-center mb-4">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-justify">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <h3 className="font-semibold mb-2">Serviços:</h3>
        <ul className="space-y-2">
          {platforms.map((platform, index) => (
            <li key={index} className="flex items-center space-x-2">
              {platform.icon}
              <span>{platform.name}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-that-green text-background hover:bg-[#a8d103]">
          <Link href={"/em-construcao"}>
            Saiba Mais
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
