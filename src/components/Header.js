import React from "react";
import shopifyLogo from "../assets/shopify-glyph.png";

export default function Header() {
  return (
    <div className="header">
      <div className="header-image">
        <a href="/">
          <img
            src={shopifyLogo}
            className="home-logo"
            alt="shopify bag logo"
          ></img>
        </a>
      </div>
      <div className="header-text">
        <h1 className="page-title">Shoppies Awards 2021</h1>
        <p>Choose your movie nominations for this year's Shoppies Award!</p>
      </div>
    </div>
  );
}
