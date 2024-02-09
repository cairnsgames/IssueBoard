import React from "react";
import TaskCard from "./taskcard";
import { Row, Col, Button } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";

const Column = (props) => {
  const {
    column,
    cards,
    onDragStart,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDragEnd,
    onDrop,
    onDropOnCard,
  } = props;
  const { id, name } = column;

  const dragStart = (e, card) => {
    onDragStart(e, card);
  };

  const dragOver = (e, item) => {
    onDragOver(e, item);
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
  const dropOnCard = (e) => {
    onDropOnCard(e);
  };

  return (
    <div
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
          <Col style={{margin:"0px",padding:"0px",marginLeft:"10px"}}>
            <h3>{name}</h3>
          </Col>
          <Col xs={3} md={3} style={{margin:"0px",padding:"0px",marginRight:"10px"}}>
            <Button size="sm" variant="">
              <Plus />
            </Button>
          </Col>
        </Row>
      {cards.map((card) => (
        <TaskCard
          key={card.id}
          card={card}
          className="kbcard m-2"
          draggable
          onDragStart={(e) => dragStart(e, card)}
          onDragEnd={dragEnd}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDragOver={(e) => dragOver(e, card)}
          onDrop={dropOnCard}
        />
      ))}
    </div>
  );
};
export default Column;
