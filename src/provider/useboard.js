import { useContext } from "react";
import { BoardContext } from "./boardprovider";

export const useBoard = () => {
  // get the context
  const context = useContext(BoardContext);

  // if `undefined`, throw an error
  if (!context) {
    throw new Error("useBoard was used outside of its Provider");
  }
  const {
    board, setBoard, updateBoard,
    columns, setColumns, changeColumnOrder, deleteColumn, addColumn, updateColumn,
    cards, epics,
    setCards,
    changeCardOrder,
    moveCardToColumn,
    addCard,
    updateCard,
    activeCard,
    setActiveCard, activeEpic, setActiveEpic,
  } = context;

  return {
    board, setBoard, updateBoard,
    columns, setColumns, changeColumnOrder, deleteColumn, addColumn, updateColumn,
    cards, epics,
    setCards,
    changeCardOrder,
    moveCardToColumn,
    addCard,
    updateCard,
    activeCard,
    setActiveCard, activeEpic, setActiveEpic,
  };
};
