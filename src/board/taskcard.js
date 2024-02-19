import React from "react";
import { Button, Card, Dropdown, Row, Col, Badge } from "react-bootstrap";
import {
  Bag,
  Bug,
  ChevronRight,
  Hash,
  Icon1CircleFill,
  Journal,
  JournalBookmarkFill,
  Stickies,
  ThreeDots,
} from "react-bootstrap-icons";
import Priority from "./priority";
import { useBoard } from "../provider/useboard";
import { IssueIcon } from "./utils";


const TaskCard = (props) => {
  const {
    card,
    epic,
    onDragStart,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDragEnd,
    onDrop,
    onEditCard,
  } = props;
  const { id, name, col } = card;

  console.log("Card Epic", card.id, epic?.id, card.parent)

  const { updateCard } = useBoard();

  const dragStart = (e) => {
    // e.dataTransfer.setData("card", JSON.stringify(card));
    if (onDragStart) {
      onDragStart(e, card);
    }
  };

  const dragOver = (e) => {
    if (onDragOver) {
      onDragOver(e, card);
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

  const editCard = (e) => {
    console.log("Double click", card);
    if (onEditCard) {
      onEditCard(e, card);
    }
  };

  const setPriority = (level) => {
    updateCard(card.id, { ...card, priority: level });
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
      onDoubleClick={editCard}
      style={{
        backgroundColor: card.backgroundcolor ?? "white",
        color: card.color ?? "black",
      }}
    >
      <Card.Header>
        <Row>
          <Col>
            <IssueIcon type={card.type} size="14" /> {card.name}
          </Col>
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
                <ThreeDots color={card.color ?? "black"} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1" onClick={editCard}>Edit</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Something...</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Close</Dropdown.Item>

                <Dropdown.Divider />
                <Dropdown>
                  <Dropdown.Toggle
                    variant="light"
                    align={"end"}
                    style={{
                      width: "100%",
                      textAlign: "left",
                    }}
                  >
                    <div>
                      Priority{" "}
                      <ChevronRight
                        className="mt-1"
                        style={{ float: "right" }}
                      />
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setPriority(1)}>
                      Priority 1
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setPriority(2)}>
                      Priority 2
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setPriority(3)}>
                      Priority 3
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setPriority(4)}>
                      Priority 4
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setPriority(5)}>
                      Priority 5
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setPriority(6)}>
                      Priority 6
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        {epic && (
          <Badge
            bg=""
            style={{
              backgroundColor: epic.backgroundcolor ?? "black",
              color: epic.color ?? "white",
            }}
          >
            {epic.name}
          </Badge>
        )}
      </Card.Body>
      <Card.Footer>
        <span
          style={{
            fontSize: "12px",
            border: "1px solid lightgrey",
            paddingRight: "5px",
            borderRadius: "4px",
          }}
        >
          <Hash /> {card.prefix}-{card.id}
        </span>
        <Priority level={card.priority} />
      </Card.Footer>
    </Card>
  );
};

export default TaskCard;
