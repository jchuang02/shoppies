import React, { useEffect, useState } from "react";
import omdb from "../apis/omdb";
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Button,
  Container
} from "shards-react";

export default function Search({ nominations, nominate }) {
  const [term, setTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState([]);

  //Debounces the search term so that searches are not done immediately.
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(() => {
    const search = async () => {
      const { data } = await omdb.get("", {
        params: {
          s: debouncedTerm,
          type: "movie",
        },
      });
      if (data.Search) {
        setResults(
          //Filters duplicate movie results from omdb API
          data.Search.filter(
            (result, index, self) =>
              index ===
              self.findIndex((movie) => movie.imdbID === result.imdbID)
          )
        );
      } else if (data.Error === "Incorrect IMDb ID.") {
        setResults("");
      } else {
        setResults(data.Error);
      }
    };
    search();
  }, [debouncedTerm]);

  //Disables Nominate Button when a movie is already in the nomination list.
  const alreadyNominated = (id) => {
    for (let i = 0; i < nominations.length; i++) {
      if (id === nominations[i].imdbID) {
        return true;
      }
    }
    return false;
  };

  //Renders the results from omdb API based on the users search term.
  const renderedResults =
    typeof results !== "string" ? (
      results.map((result) => {
        return (
          <ListGroupItem title={result.Title} key={result.imdbID}>
            <div className="list-text">
              <ListGroupItemHeading>{result.Title}</ListGroupItemHeading>
              <ListGroupItemText>{`Released ${result.Year}`}</ListGroupItemText>
            </div>
            <Button
              disabled={
                !(nominations.length < 5) || alreadyNominated(result.imdbID)
              }
              onClick={() => {
                if (!nominations) {
                  nominate(`[${JSON.stringify(result)}]`);
                } else {
                  nominate(JSON.stringify([...nominations, result]));
                }
              }}
            >
              Nominate
            </Button>
          </ListGroupItem>
        );
      })
    ) : (
      <p className="search-feedback">{results}</p>
    );

  return (
    <Container>
      <div className="input-container form-control">
        <i className="fas fa-search"></i>
        <input
          type="search"
          value={term}
          className="search-input"
          placeholder="Search Movies"
          onChange={(e) => setTerm(e.target.value)}
        />
      </div>
      <Container className="results-container">
        <ListGroup tag="ol" type="1">
          {renderedResults}
        </ListGroup>
      </Container>
    </Container>
  );
}
