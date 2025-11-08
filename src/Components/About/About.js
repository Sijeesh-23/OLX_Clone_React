import React from "react";
import "./About.css";
import Header from "../Header/Header";

function About() {
  return (
    <>
      <Header />
      <div className="aboutContainer">
        <div className="aboutContent">
          <h1>About OLX Clone</h1>
          <p>
            Welcome to <strong>OLX Clone</strong> — a community-driven
            marketplace where people can buy, sell, and connect locally.
          </p>

          <section>
            <h2>Our Mission</h2>
            <p>
              We aim to make buying and selling easier, faster, and safer for
              everyone. Whether you're upgrading your phone, selling your bike,
              or searching for a used laptop, OLX Clone brings your local
              marketplace to your fingertips.
            </p>
          </section>

          <section>
            <h2>What You Can Do</h2>
            <ul>
              <li>📱 Buy and sell new or used products easily.</li>
              <li>🏠 Post free ads for your items or services.</li>
              <li>💬 Chat securely with local buyers and sellers.</li>
              <li>⚡ Discover trending deals near you.</li>
            </ul>
          </section>

          <section>
            <h2>Why Choose Us?</h2>
            <p>
              Our platform is fast, reliable, and built with the latest web
              technologies to give you a smooth experience. We value your
              privacy and safety, ensuring that every interaction is transparent
              and user-friendly.
            </p>
          </section>

          <section>
            <h2>Contact Us</h2>
            <p>
              Have questions or feedback? We’d love to hear from you! Reach out
              to us via our support email:
            </p>
            <p>
              <a href="mailto:support@olxclone.com">support@olxclone.com</a>
            </p>
          </section>

          <footer>
            <p>© {new Date().getFullYear()} OLX Clone. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </>
  );
}

export default About;
