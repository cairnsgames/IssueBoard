import { useContext } from "react";
import { BoardContext } from "./boardprovider";

export const useBoard = () => {
    // get the context
    const context = useContext(BoardContext);
  
    // if `undefined`, throw an error
    if (!context) {
      throw new Error("useBoard was used outside of its Provider");
    }
    const { columns, cards, setCards, changeCardOrder, moveCardToColumn, addCard, updateCard } = context;
  
    return {columns, cards, setCards, changeCardOrder, moveCardToColumn, addCard, updateCard};
  };