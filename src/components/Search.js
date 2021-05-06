import React, { useEffect, useState } from "react";
import omdb from "../apis/omdb";
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  FormInput,
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
          type: "movie"
        },
      });
      if (data.Search) {
        setResults(data.Search);
      } else if (data.Error === "Incorrect IMDb ID.") {
        setResults("");
      } else  {
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
  const renderedResults = typeof(results) !== "string" ? results.map((result) => {
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
  }) : (<p class="search-feedback">{results}</p>);

  return (
    <Container>
      <label>Movie Title</label>
      <FormInput
        type="search"
        value={term}
        placeholder="Search Movies"
        onChange={(e) => setTerm(e.target.value)}
      />
      <Container className="results-container">
        <ListGroup tag="ol" type="1">{renderedResults}</ListGroup>
      </Container>
    </Container>
  );
}
