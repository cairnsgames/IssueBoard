import React from "react";
import TaskCard from "./taskcard";

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
      style={{ backgroundColor: column.backgroundcolor ?? "", color: column.color ?? ""}}
    >
      <div className="header">
        <h3>{name}</h3>
      </div>
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
