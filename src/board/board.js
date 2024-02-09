import React, { useRef, useState, useEffect } from "react";
import TaskCard from "./taskcard";
import Column from "./column";
import { Button } from "react-bootstrap";

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

  const [columns, setColumns] = useState([
    { id: 10, name: "To Do", backgroundcolor: "lightgrey", color: "black" },
    { id: 20, name: "Next up" },
    { id: 30, name: "In Progress" },
    { id: 40, name: "Ready to Release" },
    { id: 50, name: "Done" },
  ]);

  const [items, setItems] = useState([
    {
      id: 1,
      name: "Create Change Password Screen",
      col: 10,
      prefix: "Web",
      priority: 1,
      backgroundcolor: "lightblue",
      color: "black",
      parent: { id: 100, name: "Administration", bg: "green", color: "black" },
    },
    { id: 2, name: "Card 2", col: 10, prefix: "Web" },
    {
      id: 3,
      name: "Card 3",
      col: 10,
      prefix: "Web",
      priority: 2,
      backgroundcolor: "lightgreen",
      color: "red",
    },
    { id: 4, name: "Card 4", col: 10, prefix: "MBL", priority: 3 },
  ]);

  useEffect(() => {
    console.log("Card Changed", items);
  }, [items]);

  const moveCardToColumn = (card, column) => {
    console.log("Moving card", card, "to column", column);
    setItems(
      items.map((item) => {
        if (item.id === card.id) {
          console.log("Moving ", item, { ...item, col: column.id });
          item.col = column.id;
          return { ...item, col: column.id };
        }
        return item;
      })
    );
  };

  const changeCardOrder = (card1, card2) => {
    setItems((prevItems) => {
      // Find the indexes of the cards
      const index1 = prevItems.findIndex((item) => item.id === card1.id);
      const index2 = prevItems.findIndex((item) => item.id === card2.id);

      // Make a new copy of the array
      const newItems = [...prevItems];

      // Remove card1 from its old position
      const [removed] = newItems.splice(index1, 1);

      // Insert card1 before card2
      newItems.splice(index2 > index1 ? index2 - 1 : index2, 0, removed);

      return newItems;
    });
  };

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
              items={items.filter((card) => card.col === column.id)}
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
        setItems([...items, { id: items.length + 1, name: "New Card", col: 10 }])
      }}>Add</Button>
    </div>
  );
};

export default KanbanBoard;
