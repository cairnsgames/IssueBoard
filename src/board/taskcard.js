import React from "react";
import { Button, Card, Dropdown, Row, Col, Badge } from "react-bootstrap";
import { Bag, Hash, Icon1CircleFill, ThreeDots } from "react-bootstrap-icons";
import Priority from "./priority";

const TaskCard = (props) => {
  const {
    card,
    onDragStart,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDragEnd,
    onDrop,
  } = props;
  const { id, name, col } = card;

  const dragStart = (e) => {
    // e.dataTransfer.setData("card", JSON.stringify(card));
    onDragStart(e, card);
  };

  const dragOver = (e) => {
    onDragOver(e, card);
  };

  const dragEnd = (e) => {
    onDragEnd(e);
  };

  const dragEnter = (e) => {
    onDragEnter(e);
  };

  const dragLeave = (e) => {
    onDragLeave(e);
  };

  const drop = (e) => {
    onDrop(e);
  };

  return (
    <Card
      id={card.id}
      className="kbcard m-2 p-1"
      draggable
      onDragStart={dragStart}
      onDragEnd={dragEnd}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDragOver={dragOver}
      onDrop={drop}
      style={{
        backgroundColor: card.backgroundcolor ?? "white",
        color: card.color ?? "black",
      }}
    >
      <Card.Header>
        <Row>
          <Col>{card.name}</Col>
          <Col xs={1}>
            <Dropdown style={{ float: "right" }} align={"end"}>
              <Dropdown.Toggle
                variant="light"
                id="dropdown-basic"
                style={{
                  backgroundColor: "rgb(0,0,0,0)",
                  borderColor: "rgb(0,0,0,0)",
                }}
              >
                <ThreeDots />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        {card?.parent && (
          <Badge bg="" style={{ backgroundColor: card.parent.bg ?? "black", color: card.parent.color ?? "white" }}>
            {card.parent.name}
          </Badge>
        )}
      </Card.Body>
      <Card.Footer>
        <span style={{ fontSize: "12px", border: "1px solid lightgrey", paddingRight:"5px", borderRadius: "4px" }}>
          <Hash /> {card.prefix}-{card.id}
        </span>
        <Priority level={card.priority} />
      </Card.Footer>
    </Card>
  );
};

export default TaskCard;
