import React from "react";
import shopifyLogo from "../assets/shopify-glyph.png";

export default function Header() {
  return (
    <header className="header">
      <div className="header-image">
        <a href="/">
          <img
            src={shopifyLogo}
            className="home-logo"
            alt=""
          ></img>
        </a>
      </div>
      <div className="header-text">
        <h1 className="page-title">Shoppies Awards 2021</h1>
        <p>Vote for your favorite movies in this year's Shoppies Awards!</p>
      </div>
    </header>
  );
}
