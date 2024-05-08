import React from "react";
import TaskCard from "./taskcard";
import { Row, Col, Button } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";

const Column = (props) => {
  const {
    column,
    cards, epics,
    onDragStart,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDragEnd,
    onDrop,
    onDropOnCard,
    onEditCard
  } = props;
  const { id, name } = column;

  const dragStart = (e, card) => {
    if (onDragStart) {
      onDragStart(e, card);
    }
  };

  const dragOver = (e, item) => {
    if (onDragOver) {
      onDragOver(e, item);
    }
  };

  const dragEnd = (e) => {
    if (onDragEnd) {
      onDragEnd(e);
    }
  };

  const dragEnter = (e) => {
    if (onDragEnter) {
      onDragEnter(e);
    }
  };

  const dragLeave = (e) => {
    if (onDragLeave) {
      onDragLeave(e);
    }
  };

  const drop = (e) => {
    if (onDrop) {
      onDrop(e);
    }
  };
  const dropOnCard = (e) => {
    if (onDropOnCard) {
      onDropOnCard(e);
    }
  };

  const editCard = (e, card) => {
    if (onEditCard) {
      onEditCard(e, card);
    }
  };

  return (
    <div
      key={column.id}
      id={column.id}
      className="kbcolumn"
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDragOver={(e) => dragOver(e, column)}
      onDrop={drop}
      data-target={column.id}
      style={{
        backgroundColor: column.backgroundcolor ?? "",
        color: column.color ?? "",
      }}
    >
      <Row className="header">
        <Col style={{ margin: "0px", padding: "0px", marginLeft: "10px" }}>
          <h3>{name}</h3>
        </Col>
        <Col
          xs={3}
          md={3}
          style={{ margin: "0px", padding: "0px", marginRight: "10px" }}
        >
          <Button size="sm" variant="" style={{paddingTop: "0px"}}>
            <Plus />
          </Button>
        </Col>
      </Row>
      {cards.map((card) => (
        <TaskCard
          key={card.id}
          card={card}
          epic={epics.find((epic) => epic.id == card.parent)}
          className="kbcard m-2"
          draggable
          onDragStart={(e) => dragStart(e, card)}
          onDragEnd={dragEnd}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDragOver={(e) => dragOver(e, card)}
          onDrop={dropOnCard}
          onEditCard={editCard}
        />
      ))}
    </div>
  );
};
export default Column;
