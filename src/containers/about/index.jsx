// containers/about/index.jsx
import TeamCarousel from "./TeamCarousel";
import "./about.css";

export default function AboutUs() {
  return (
    <main id="about" className="about-container">
      <div className="about-header">
        <h1 className="about-title">Sobre Nós</h1>
        <p className="about-description">
          Desde 2015, atuamos criando conteúdos que vão além da estética,  unimos estratégia, direção criativa e posicionamento para ajudar marcas a se destacarem e venderem de forma consistente.
          Com base sólida em design e publicidade, nosso trabalho conecta imagem, mensagem e performance em cada projeto.
          Aqui, nada é feito no achismo. Cada vídeo, foto e planejamento tem um propósito: atrair, conectar e gerar resultado.
          Se é pra comunicar, que seja do jeito certo. Faça.
        </p>
      </div>

      <h2 className="about-team-title">Nosso time</h2>
      
      {/* Usando o carrossel em vez do grid */}
      <TeamCarousel reverse={false} />
    </main>
  );
}