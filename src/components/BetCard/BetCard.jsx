import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import './BetCard.css'

export default function BetCard() {
  return (
    <Card style={{ width: "18rem" }} className="bet-card">
      <Card.Img variant="top-left" src="holder.js/100px180?text=Image cap" />
      <Card.Img variant="top-right" src="holder.js/100px180?text=Image cap" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>Cras justo odio</ListGroup.Item>
        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
  );
}

// {
//   "type": "game score",
// 	"gameId": 11872,
//   "amount": 30,
//   "userOne": {
//     "id": "63e0f36c49d892861762ae6b",
//     "bet": {
//       "winner": "detroit pistons",
// 			"overUnder": 9
//     }
//   }
// }