import React from "react";
import { Card, Dropdown, Row, Col, Badge } from "react-bootstrap";
import {
  ChevronRight,
  Hash,
  PersonCircle,
  ThreeDots,
} from "react-bootstrap-icons";
import PriorityDropdown from "../components/prioritydropdown";
import { useBoard } from "../provider/useboard";
import { IssueIcon } from "../utils/icons";
import HashLink from "../components/hashlink";
import CardPerson from "./cardperson";
import StatusDropdown from "../components/StatusDropdown"; // Importing the new component
import PriorityQuickSelect from "./PriorityQuickSelect"; // Importing the new component

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
  const { updateCard, columns } = useBoard();

  const dragStart = (e) => {
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
  const setCardAssignee = (card, id) => {
    updateCard(card.id, { ...card, person: id });
  }

  const getBackgroundcolor = () => {
    if (card.backgroundcolor) {
      return card.backgroundcolor;
    }
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
            <HashLink href={`#board/card?id=${card.id}`}>{card.name}</HashLink>
          </Col>
          <Col xs={1}>
            <Dropdown
              style={{ float: "right", paddingRight: "0" }}
              align={"end"}
            >
              <Dropdown.Toggle
                variant="light"
                style={{
                  paddingTop: "0px",
                  backgroundColor: "rgb(0,0,0,0)",
                  borderColor: "rgb(0,0,0,0)",
                }}
              >
                <ThreeDots color={card.color ?? "black"} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href={`#board/card?id=${card.id}`}>Edit</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Something...</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Close</Dropdown.Item>

                <Dropdown.Divider />
                <StatusDropdown columns={columns} setStatus={setStatus} editCard={editCard} /> {/* Using the new component */}
                <PriorityDropdown currentPriority={card.priority} setPriority={setPriority} />
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
        <PriorityQuickSelect setPriority={setPriority} card={card} />
        <CardPerson card={card} id={card.person} onSelect={setCardAssignee} />
      </Card.Footer>
    </Card>
  );
};

export default TaskCard;
