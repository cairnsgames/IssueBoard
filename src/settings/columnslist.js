import ListGroup from "react-bootstrap/ListGroup";
import { useBoard } from "../provider/useboard";
import { useState, useRef } from "react";
import { GripVertical, PencilSquare, Trash } from "react-bootstrap-icons";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const ColumItem = (props) => {
  const { column } = props;

  const dragStart = (e) => {
    props.onDragStart(e, column);
  };
  const dragOver = (e) => {
    props.onDragOver(e, column);
  };

  return (
    <ListGroup.Item
      draggable
      onDragStart={dragStart}
      onDragEnter={props.onDragEnter}
      onDragLeave={props.onDragLeave}
      onDragOver={dragOver}
      onDrop={props.onDrop}
      className="column-row"
    >
      <Row>
        <Col xs={1}>
          <GripVertical />
        </Col>
        <Col>{column.name}</Col>
        <Col xs={3}>
          <Button variant="light"><PencilSquare /></Button>
          <Button variant="light"><Trash /></Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

const ColumnsList = () => {
  const dragItem = useRef();
  const dragOverItem = useRef();
  const { columns, changeColumnOrder } = useBoard();
  const [overItem, setOverItem] = useState();
  const [dragData, setDragData] = useState();

  const dragStart = (e, item) => {
    dragItem.current = e.target;
    setDragData(item);
    setTimeout(() => {
      dragItem.current.style.display = "none";
    }, 0);
  };
  const dragEnter = (e) => {
    if (!e.target.classList.contains('column-row')) {
      return
    }
    if (dragOverItem.current && dragOverItem.current !== e.target) {
      dragOverItem.current.classList.toggle("dragging");
    }
    console.log("e.target", e.target)
    dragOverItem.current = e.target;
    dragOverItem.current.classList.toggle("dragging");
    e.preventDefault();
    e.stopPropagation();
  };

  const dragLeave = (e) => {
    if (!e.target.classList.contains('column-row')) {
      return
    }
    if (dragOverItem.current && dragOverItem.current === e.target) {
      dragOverItem.current.classList.toggle("dragging");
      dragOverItem.current = undefined;
    }

    e.preventDefault();
    e.stopPropagation();
  };
  const dragOver = (e, item) => {
    
    if (!e.target.classList.contains('column-row')) {
      return
    }
    setOverItem(item);
    e.preventDefault();
    e.stopPropagation();
  };
  const dropOnColumn = (e) => {
    if (!dragOverItem.current) {
      return;
    }
    dragOverItem.current = undefined;
  };
  const dropOnCard = (e) => {
    if (!dragOverItem.current) {
      return;
    }
    dragOverItem.current.classList.toggle("dragging");
    changeColumnOrder(dragData, overItem);

    setTimeout(() => {
      if (dragItem.current) {
        dragItem.current.style.display = "block";
      }
      dragOverItem.current = undefined;
    }, 0);
  };
  const dragEnd = (e) => {
    setTimeout(() => {
      dragItem.current.style.display = "block";
      dragItem.current = null;
      dragOverItem.current = null;
      setDragData(null);
    }, 10);
  };

  return (
    <ListGroup>
      {columns.map((column) => {
        return (
          <ColumItem
            key={column.id}
            column={column}
            onDragStart={dragStart}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            onDragOver={dragOver}
            onDrop={dropOnCard}
            onDragEnd={dragEnd}
          />
        );
      })}
    </ListGroup>
  );
};

export default ColumnsList;
