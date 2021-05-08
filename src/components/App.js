import React, { useEffect } from "react";
import Search from "./Search";
import Banner from "./Banner";
import Header from "./Header";
import Footer from "./Footer";
import { Container, Col, Row } from "shards-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import "../css/app.css";
import useLocalStorage from "react-use-localstorage";
import {
  colorBlue,
  colorPurple,
  colorGreen,
  colorRed,
  colorOrange,
  colorYellow,
} from "@shopify/polaris-tokens";

export default function App() {
  const [nominations, setNominations] = useLocalStorage("[]");

  useEffect(() => {
    //Confetti animation when 5 nominees are chosen by the user.
    if (nominations && JSON.parse(nominations).length === 5) {
      const celebrate = () => {
        for (let i = 0; i < 100; i++) {
          // Random rotation
          const randomRotation = Math.floor(Math.random() * 360);
          // Random Scale
          const randomScale = Math.random() * 1;
          // Random width & height between 0 and viewport
          const randomWidth = Math.floor(
            Math.random() *
              Math.max(
                document.documentElement.clientWidth,
                window.innerWidth || 0
              )
          );
          const randomHeight = Math.floor(
            Math.random() *
              Math.max(
                document.documentElement.clientHeight,
                window.innerHeight || 300
              )
          );

          // Random animation-delay
          const randomAnimationDelay = Math.floor(Math.random() * 15);

          // Random colors
          const colors = [
            colorBlue,
            colorOrange,
            colorYellow,
            colorPurple,
            colorRed,
            colorGreen,
          ];

          const randomColor = colors[Math.floor(Math.random() * colors.length)];

          // Create confetti pieces
          const confetti = document.createElement("div");
          confetti.style.animationDelay = randomAnimationDelay + "s";
          confetti.className = "confetti";
          confetti.style.backgroundColor = randomColor;
          confetti.style.obacity = randomScale;
          confetti.style.right = randomWidth + "px";
          confetti.style.top = randomHeight + "px";
          confetti.style.transform =
            "skew(16deg) rotate(" + randomRotation + "deg)";
          document.getElementById("confetti-wrapper").appendChild(confetti);
        }
      };
      celebrate();

      //Stop confetti animation if all 5 nominations are not present
      return function cleanup() {
        let confetti = document.getElementById("confetti-wrapper");
        while (confetti.firstChild) {
          confetti.removeChild(confetti.firstChild);
        }
      };
    }
  }, [nominations]);

  return (
    <>
      <Header />
      <Container className="banner-container">
        <Banner
          nominations={nominations ? JSON.parse(nominations) : nominations}
          removeNominee={setNominations}
        />
      </Container>
      <Container className="search-container">
        <Row>
          <Col>
            <Search
              nominations={nominations ? JSON.parse(nominations) : nominations}
              nominate={setNominations}
            />
          </Col>
        </Row>
      </Container>
      <div id="confetti-wrapper"></div>
      <Footer />
    </>
  );
}
