import React from "react";
import { Card, Dropdown, Row, Col, Badge } from "react-bootstrap";
import { ChevronRight, Hash, ThreeDots } from "react-bootstrap-icons";
import Priority from "./priority";
import { useBoard } from "../provider/useboard";
import { IssueIcon } from "../utils/icons";
import HashLink from "../components/hashlink";

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

  const { updateCard, columns } = useBoard();

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
    if (onEditCard) {
      onEditCard(e, card);
    }
  };

  const setPriority = (level) => {
    updateCard(card.id, { ...card, priority: level });
  };
  const setStatus = (status) => {
    updateCard(card.id, { ...card, col: status });
  };

  const getBackgroundcolor = () => {
    if (card.backgroundcolor) {
      return card.backgroundcolor;
    }
    // if (epic?.backgroundcolor) {
    //   const rgb = colorToRGB(epic.backgroundcolor);
    //   console.log("RGB", rgb);
    //   const bg = newShade(rgb, 50);
    //   console.log("BG", bg);
    //   return bg;
    // }
    return "white";
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
        backgroundColor: getBackgroundcolor(),
        color: card.color ?? "black",
      }}
    >
      <Card.Header>
        <Row>
          <Col xs={1}>
            <IssueIcon type={card.type} size="14" />
          </Col>
          <Col>
            <HashLink href={`#board/card?id=${card.id}`}>
              {card.name}
            </HashLink>
          </Col>
          <Col xs={1}>
            <Dropdown style={{ float: "right", paddingRight: "0" }} align={"end"}>
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
                <Dropdown.Item onClick={editCard}>Edit</Dropdown.Item>
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
                      Status{" "}
                      <ChevronRight
                        className="mt-1"
                        style={{ float: "right" }}
                      />
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {columns.map((col) => {
                      return (
                        <Dropdown.Item
                          key={col.id}
                          onClick={() => setStatus(col.id)}
                        >
                          {col.name}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
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
