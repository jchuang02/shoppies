import React from "react";
import { MediaCard } from "@shopify/polaris";

export default function Banner({ nominations, removeNominee }) {
  console.log(nominations.length);
  const showNominees = nominations.length === 5 ? (
    nominations.map((theNominee) => {
      return (
        <MediaCard
          title={theNominee.Title}
          primaryAction={{
            content: "Remove",
            onAction: () => {
              removeNominee(
                JSON.stringify(
                  nominations.filter(
                    (nominee) => nominee.imdbID !== theNominee.imdbID
                  )
                )
              );
            },
          }}
          description={`Released ${theNominee.Year}`}
          size="small"
          key={theNominee.imdbID}
        >
          <img
            alt={`${theNominee.Title} movie poster`}
            width="100%"
            height="100%"
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            src={
              theNominee.Poster !== "N/A"
                ? theNominee.Poster
                : "https://img.icons8.com/carbon-copy/100/000000/no-image.png"
            }
          />
        </MediaCard>
      );
    })
  ) : (
    <p>Choose your top 5 Nominees! You have nominated {nominations.length} films</p>
  );

  return <div>{showNominees}</div>;
}
