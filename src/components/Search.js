import React, { useEffect, useState } from "react";
import omdb from "../apis/omdb";
import { Card, Button } from "@shopify/polaris";

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
        },
      });
      if (data.Search) {
        setResults(data.Search);
      } else {
        setResults([]);
      }
    };
    search();
  }, [debouncedTerm]);

  const alreadyNominated = (id) =>  {
    for(let i = 0; i < nominations.length; i++) {
      console.log(id === nominations[i].imdbID);
      if (id === nominations[i].imdbID) {
        return true;
      }
    }
    return false;
  }

  const renderedResults = results.length ? (
    results.map((result) => {
      return (
        <Card title={result.Title} key={result.imdbID}>
          <Card.Section>
            {/* <img
              alt={`${result.Title} movie poster`}
              width="20%"
              height="20%"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
              src={
                result.Poster !== "N/A"
                  ? result.Poster
                  : "https://img.icons8.com/carbon-copy/100/000000/no-image.png"
              }
            /> */}
            <p>{`Released ${result.Year}`}</p>
          </Card.Section>
          <Card.Section>
            <Button
              disabled={!(nominations.length < 5) || alreadyNominated(result.imdbID)}
              onClick={() => {
                if (!nominations) {
                  nominate(`[${JSON.stringify(result)}]`);
                } else {
                  nominate(JSON.stringify([...nominations, result]));
                }
              }}
            >Nominate</Button>
          </Card.Section>
        </Card>
      );
    })
  ) : (
    <div>Movie Not Found</div>
  );

  return (
    <div>
      <label>Movie Title</label>
      <input
        type="search"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      {renderedResults}
    </div>
  );
}
