import React from "react";
import { Row } from "shards-react";
import CustomCard from "./CustomCard";

export default function Banner({ nominations, removeNominee }) {
  const nomineesFeedback =
    nominations.length === 5 ? (
      <div
        className={
          nominations.length === 5
            ? "bounce nominees-feedback"
            : "nominees-feedback"
        }
      >
        <p>You have chosen your top 5 nominees!</p>
      </div>
    ) : (
      <div className="nominees-feedback">
        <p>Choose your top 5 movie nominees</p>
      </div>
    );

  const showNominees = nominations ? nominations.map((theNominee) => {
    return (
      <CustomCard
        nominations={nominations}
        theNominee={theNominee}
        removeNominee={removeNominee}
        key={theNominee.imdbID}
      />
    );
  }) : "";

  return (
    <>
      {nomineesFeedback}
      <Row className="cards">{showNominees}</Row>
    </>
  );
}
