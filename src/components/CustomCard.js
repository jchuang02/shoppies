import React, { useState } from "react";
import {
  Col,
  Card,
  CardTitle,
  CardSubtitle,
  CardImg,
  CardBody,
  CardFooter,
  Button,
} from "shards-react";

export default function CustomCard({ nominations, theNominee, removeNominee }) {
  const [toggle, setToggle] = useState(false);

  return (
    <Col className="card-column">
      <Card className={toggle ? "fade-out" : "fade-in"}>
        <CardImg
          top
          alt={theNominee.poster ? `${theNominee.Title} Movie Poster` : ""}
          src={
            theNominee.Poster !== "N/A" ? (
              theNominee.Poster
            ) : (
              "https://img.icons8.com/material-outlined/192/000000/no-image.png"
            )
          }
        />
        <CardBody>
          <CardTitle className="card-title">{theNominee.Title}</CardTitle>
          <CardSubtitle className="card-subtitle">{`Released ${theNominee.Year}`}</CardSubtitle>
        </CardBody>
        <CardFooter>
          <Button
            style={{}}
            block={true}
            onClick={() => {
              setToggle((toggle) => !toggle);
              setTimeout(() => {
                removeNominee(
                  JSON.stringify(
                    nominations.filter(
                      (nominee) => nominee.imdbID !== theNominee.imdbID
                    )
                  )
                );
              }, 500);
            }}
            theme="danger"
          >
            Remove
          </Button>
        </CardFooter>
      </Card>
    </Col>
  );
}
