import React, { useRef, useState } from "react";
import TaskCard from "./taskcard";
import Column from "./column";
import { Button } from "react-bootstrap";
import { useBoard } from "../provider/useboard";
import EditTask from "./edittask";
import BoardHeader from "./boardheader";

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

  const {
    board,
    columns,
    cards, epics,
    setCards,
    changeCardOrder,
    moveCardToColumn,
    addCard, updateCard,
    activeCard, setActiveCard
  } = useBoard();

  const dragStart = (e, card) => {
    dragItem.current = e.target;
    setDragCard(card);
    setTimeout(() => {
      dragItem.current.style.display = "none";
    }, 0);
  };
  const dragEnter = (e) => {
    if (dragOverItem.current && dragOverItem.current !== e.target) {
      dragOverItem.current.classList.toggle("dragging");
    }
    dragOverItem.current = e.target;
    dragOverItem.current.classList.toggle("dragging");
    e.preventDefault();
    e.stopPropagation();
  };

  const dragLeave = (e) => {
    if (dragOverItem.current && dragOverItem.current === e.target) {
      dragOverItem.current.classList.toggle("dragging");
      dragOverItem.current = undefined;
    }

    e.preventDefault();
    e.stopPropagation();
  };
  const dragOver = (e, item) => {
    setOverItem(item);
    e.preventDefault();
    e.stopPropagation();
  };
  const dropOnColumn = (e) => {
    if (!dragOverItem.current) {
      return;
    }
    dragOverItem.current.classList.toggle("dragging");
    const dropTargetId = dragOverItem.current.getAttribute("data-target");
    moveCardToColumn(
      dragCard,
      columns.find((col) => col.id == dropTargetId)
    );
    dragOverItem.current = undefined;
  };
  const dropOnCard = (e) => {
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

  const editCard = (e, card) => {
    setActiveCard(card);
  }

  return (
    <div className="kbcontainer">
      <BoardHeader />
      <div className="kbboard">
        {columns.map((column) => {
            let cardList = cards.filter((card) => card.col == column.id);
            if (!board.includeEpics) {
              cardList = cardList.filter((card) => card.type !== "epic");
            }
          return (
            <Column
              key={column.id}
              column={column}
              cards={cardList}
              epics={epics}
              onDragStart={(e, card) => dragStart(e, card)}
              onDragEnter={dragEnter}
              onDragLeave={dragLeave}
              onDragOver={dragOver}
              onDrop={dropOnColumn}
              onDropOnCard={dropOnCard}
              onDragEnd={dragEnd}
              onEditCard={editCard}
            />
          );
        })}
      </div>

      <Button
        onClick={() => {
          const newCard = addCard();
          setActiveCard(newCard);
        }}
      >
        Add
      </Button>

      {activeCard && <EditTask card={activeCard} close={()=>setActiveCard()} setCard={setActiveCard} saveCard={updateCard} />}
    </div>
  );
};

export default KanbanBoard;
