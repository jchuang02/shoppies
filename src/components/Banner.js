import React from "react";
import {
  Col,
  Card,
  CardTitle,
  CardSubtitle,
  CardImg,
  CardBody,
  CardFooter,
  Button,
  Row,
} from "shards-react";

export default function Banner({ nominations, removeNominee }) {

  const nomineesFeedback =
    nominations.length === 5 ? (
      <div className="nominees-feedback">
        <p>You have chosen your top 5 nominees</p>
      </div>
    ) : (
      <div className="nominees-feedback">
        <p>Choose your top 5 movie nominees</p>
      </div>
    );

  const showNominees = nominations.map((theNominee) => {
    return (
      <Col style={{ flexGrow: 0, width: "20%" }}>
        <Card
          key={theNominee.imdbID}
          style={{
            width: "100%",
            height: "100%",
            flexWrap: "wrap",
            alignContent: "space-between",
          }}
        >
          <CardImg
            top
            src={
              theNominee.Poster !== "N/A"
                ? theNominee.Poster
                : "https://img.icons8.com/carbon-copy/100/000000/no-image.png"
            }
            style={{ maxHeight: "16rem" }}
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
                removeNominee(
                  JSON.stringify(
                    nominations.filter(
                      (nominee) => nominee.imdbID !== theNominee.imdbID
                    )
                  )
                );
              }}
              theme="danger"
            >
              Remove
            </Button>
          </CardFooter>
        </Card>
      </Col>
    );
  });

  return (
    <React.Fragment>
      {nomineesFeedback}
      <Row style={{ contentnAlign: "center" }}>{showNominees}</Row>
    </React.Fragment>
  );
}
