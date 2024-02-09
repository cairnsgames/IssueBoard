import React, { createContext, useEffect, useState } from "react";

// create context
const BoardContext = createContext({ columns: [], items: []});

const BoardProvider = ( props ) => {
  const { children } = props;

  const [columns, setColumns] = useState([
    { id: 10, name: "To Do", backgroundcolor: "lightgrey", color: "black" },
    { id: 20, name: "Next up", backgroundcolor: "lightgrey", color: "black" },
    { id: 30, name: "In Progress", backgroundcolor: "lightgrey", color: "black" },
    { id: 40, name: "Ready to Release", backgroundcolor: "lightgrey", color: "black" },
    { id: 50, name: "Done", backgroundcolor: "lightgreen", color: "black" },
  ]);

  const [cards, setCards] = useState([
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

  const changeCardOrder = (card1, card2) => {
    setCards((prevcards) => {
      // Find the indexes of the cards
      const index1 = prevcards.findIndex((item) => item.id === card1.id);
      const index2 = prevcards.findIndex((item) => item.id === card2.id);

      // Make a new copy of the array
      const newcards = [...prevcards];

      // Remove card1 from its old position
      const [removed] = newcards.splice(index1, 1);

      // Insert card1 before card2
      newcards.splice(index2 > index1 ? index2 - 1 : index2, 0, removed);

      return newcards;
    });
  };

  const moveCardToColumn = (card, column) => {
    console.log("Moving card", card, "to column", column);
    setCards(
      cards.map((item) => {
        if (item.id === card.id) {
          console.log("Moving ", item, { ...item, col: column.id });
          item.col = column.id;
          return { ...item, col: column.id };
        }
        return item;
      })
    );
  };

  const addCard = () => {
    setCards([...cards, { id: cards.length + 1, name: "New Card", col: 10 }]);
  };

  const updateCard = (id, card) => {
    setCards(
      cards.map((item) => {
        if (item.id === id) {
          return card;
        }
        return item;
      })
    );
  
  }

//   useEffect(() => {
//     fetch(process.env.REACT_APP_Board_API + "params.php", {
//       headers: { "Content-Type": "application/json", "APP_ID": Board },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setParams(data.params);
//       })
//   }, [Board]);

  return (
    <BoardContext.Provider value={{columns, cards, setCards, changeCardOrder, moveCardToColumn, addCard, updateCard}}>
      {children}
    </BoardContext.Provider>
  );
};

export { BoardContext, BoardProvider }