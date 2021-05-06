import React from "react";
import Search from "./Search";
import Banner from "./Banner";
import Header from "./Header";
import Footer from "./Footer";
import { Container, Col, Row } from "shards-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import "../utils/app.css";
import useLocalStorage from "react-use-localstorage";

export default function App() {
  const [nominations, setNominations] = useLocalStorage("[]");
  return (
    <React.Fragment>
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
      <Footer/>
    </React.Fragment>
  );
}
