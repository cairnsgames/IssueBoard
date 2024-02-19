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
    columns,
    cards, epics,
    setCards,
    changeCardOrder,
    moveCardToColumn,
    addCard,
    updateCard,
    activeCard,
    setActiveCard,
  } = context;

  console.log("useBoard EPICS", epics);

  return {
    columns,
    cards, epics,
    setCards,
    changeCardOrder,
    moveCardToColumn,
    addCard,
    updateCard,
    activeCard,
    setActiveCard,
  };
};
