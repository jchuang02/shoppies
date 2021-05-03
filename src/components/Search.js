import React, { useEffect, useState } from "react";
import omdb from "../apis/omdb";
import { Button, Card, List } from "@shopify/polaris";

export default function Search() {
  const [term, setTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm ] = useState(term);
  const [results, setResults] = useState([]);

  //Debounces the search term so that searches are not done immediately.
  useEffect(() => {
    const timerId = setTimeout(() =>  {
      setDebouncedTerm(term);
    }, 1000);

    return () =>  {
      clearTimeout(timerId);
    }
  }, [term]);

  useEffect(() =>   {
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

  const renderedResults = results.length ? (
    results.map((result) => {
      return (
        <Card sectioned>
          <List key={result.imdbID}>
            <List.Item>{result.Title}</List.Item>
            <List.Item>{result.Year}</List.Item>
            <Button>Nominate but it doesn't work</Button>
          </List>
        </Card>
      );
    })
  ) : (
    <div>Movie Not Found!</div>
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
};