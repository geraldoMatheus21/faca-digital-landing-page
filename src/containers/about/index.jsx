// containers/about/index.jsx
import TeamCarousel from "./TeamCarousel";
import "./about.css";

export default function AboutUs() {
  return (
    <main id="about" className="about-container">
      <div className="about-header">
        <h1 className="about-title">Sobre Nós</h1>
        <p className="about-description">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat voluptatem consequuntur est eveniet ducimus repellat alias cumque optio consequatur animi voluptatibus, minus beatae quam quae temporibus blanditiis officia necessitatibus a?
        </p>
      </div>

      <h2 className="about-team-title">Nosso time</h2>
      
      {/* Usando o carrossel em vez do grid */}
      <TeamCarousel reverse={false} />
    </main>
  );
}