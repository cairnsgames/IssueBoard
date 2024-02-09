import React, { useRef, useState, useEffect } from "react";
import TaskCard from "./taskcard";
import Column from "./column";
import { Button } from "react-bootstrap";
import { useBoard } from "../provider/useboard";

/*
Database
- Project
- Column
- Task

1. Start Dragging
- Card
2. Drag Over
- Column
- Card
3. Drop
- Colum - move ticket
- Card - move ticket and/or reorder 

Filter
- by card fields

onMoveTicket
- Change column details
onReorderTicket
- Change ticket details


dragItem - Card being dragged
dragOverItem - Column/Card being dragged over

*/

const KanbanBoard = (props) => {
  const dragItem = useRef();
  const dragOverItem = useRef();

  const [overItem, setOverItem] = useState();
  const [dragCard, setDragCard] = useState();

  const { columns, cards, setCards, changeCardOrder, moveCardToColumn, addCard } = useBoard();

  useEffect(() => {
    console.log("Card Changed", cards);
  }, [cards]);

  const dragStart = (e, card) => {
    console.log("Drag Start", e.target, card);
    dragItem.current = e.target;
    setDragCard(card);
    setTimeout(() => {
      dragItem.current.style.display = "none";
    }, 0);
  };
  const dragEnter = (e) => {
    if (dragOverItem.current && dragOverItem.current !== e.target) {
      console.log("Drag Exists", dragOverItem.current, e.target);
      dragOverItem.current.classList.toggle("dragging");
    }
    console.log("Drag Enter", e.target, dragOverItem.current);
    dragOverItem.current = e.target;
    dragOverItem.current.classList.toggle("dragging");
    e.preventDefault();
    e.stopPropagation();
  };

  const dragLeave = (e) => {
    console.log("Drag Leave", e.target, dragOverItem.current);
    if (dragOverItem.current && dragOverItem.current === e.target) {
      dragOverItem.current.classList.toggle("dragging");
      dragOverItem.current = undefined;
    }

    e.preventDefault();
    e.stopPropagation();
  };
  const dragOver = (e, item) => {
    // console.log("Drag Over", e.target, item);
    setOverItem(item);
    e.preventDefault();
    e.stopPropagation();
  };
  const dropOnColumn = (e) => {
    console.log("Drop on Column");
    if (!dragOverItem.current) {
      return;
    }
    dragOverItem.current.classList.toggle("dragging");
    console.log("Drop event", dragOverItem.current);
    const dropTargetId = dragOverItem.current.getAttribute("data-target");
    moveCardToColumn(
      dragCard,
      columns.find((col) => col.id == dropTargetId)
    );
    dragOverItem.current = undefined;
  };
  const dropOnCard = (e) => {
    console.log("DROP ON CARD", overItem, dragCard);
    if (!dragOverItem.current) {
      return;
    }
    dragOverItem.current.classList.toggle("dragging");
    if (overItem && dragCard.col !== overItem.col) {
      moveCardToColumn(
        dragCard,
        columns.find((col) => col.id == overItem.col)
      );
    }
    changeCardOrder(dragCard, overItem);

    setTimeout(() => {
      dragItem.current.style.display = "block";
    }, 0);
    dragOverItem.current = undefined;
  };
  const dragEnd = (e) => {
    setTimeout(() => {
      dragItem.current.style.display = "block";
      dragItem.current = null;
      dragOverItem.current = null;
    }, 0);
  };

  return (
    <div>
      <div className="kbboard">
        {columns.map((column) => {
          return (
            <Column
              column={column}
              cards={cards.filter((card) => card.col === column.id)}
              onDragStart={(e, card) => dragStart(e, card)}
              onDragEnter={dragEnter}
              onDragLeave={dragLeave}
              onDragOver={dragOver}
              onDrop={dropOnColumn}
              onDropOnCard={dropOnCard}
              onDragEnd={dragEnd}
            />
          );
        })}
      </div>

      <Button onClick={() => {
        addCard();
      }}>Add</Button>
    </div>
  );
};

export default KanbanBoard;
