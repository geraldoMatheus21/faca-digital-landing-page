// containers/about/index.jsx
import TeamCarousel from "./TeamCarousel";
import "./about.css";

export default function AboutUs() {
  return (
    <main id="about" className="about-container">
      <div className="about-header">
        <h1 className="about-title">Sobre Nós</h1>
        <p className="about-description">
          Fundada em 2015, a Faça Digital nasceu da paixão por conectar pessoas e marcas no universo digital. 
          Desde então, temos crescido constantemente, ajudando empresas de todos os tamanhos a alcançarem seu potencial máximo.
        </p>
      </div>

      <h2 className="about-team-title">Nossa Equipe</h2>
      
      {/* Usando o carrossel em vez do grid */}
      <TeamCarousel reverse={false} />
    </main>
  );
}