import React from "react";
import "./About.css";

const About = () => {
  return (
    <section className="about-section">
      <div className="about-overlay"></div> {/* same decorative glow as home */}

      <div className="about-container">
        <h1 className="about-title">About Productivity Hub</h1>
        <p className="about-subtext">
          Productivity Hub isn’t just another to-do app — it’s your daily companion that helps
          organize your thoughts, tasks, and goals in a simple yet powerful way.
        </p>

        <div className="about-content">
          <div className="about-card">
            <h2>Our Mission</h2>
            <p>
              To help individuals and teams achieve clarity, focus, and success through
              thoughtfully designed productivity tools that feel intuitive and visually inspiring.
            </p>
          </div>

          <div className="about-card">
            <h2>What Makes Us Unique?</h2>
            <p>
              We believe productivity doesn’t have to be dull. Our app combines function and beauty
              — transforming your workspace into a calm, motivating environment.
            </p>
          </div>

          <div className="about-card">
            <h2>Our Vision</h2>
            <p>
              We aim to redefine how people manage time and tasks — empowering a balanced, mindful,
              and efficient approach to everyday life.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
