// containers/about/TeamMemberCard.jsx
import Image from "next/image";
import "./team-member.css";

export default function TeamMemberCard({ quote, name, designation, src }) {
  return (
    <div className="team-member-card">
      <div className="team-member-image-container">
        <Image
          src={src}
          alt={name}
          className="team-member-image"
          width={400}
          height={300}
          priority={false}
        />
      </div>
      <div className="team-member-content">
        <h3 className="team-member-name">{name}</h3>
        <p className="team-member-designation">{designation}</p>
        <blockquote className="team-member-quote">
          "{quote}"
        </blockquote>
      </div>
    </div>
  );
}