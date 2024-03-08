import React, { createContext, useEffect, useMemo, useState } from "react";

/* Format for a card
      id: 1,
      name: "Create Change Password Screen",
      col: 10,
      prefix: "Web",
      priority: 1,
      backgroundcolor: "lightblue",
      description: "",
      color: "black",
      type: "bug",
      parent: { id: 100, name: "Administration", bg: "green", color: "black" },
*/

// create context
const BoardContext = createContext({ columns: [], items: [] });

const BoardProvider = (props) => {
  const { children } = props;

  const [board, setBoard] = useState({
    id: 1,
    name: "Kanban Board",
    code: "WEB",
    defaultColumn: 10,
    includeEpics: true
  });

  const [columns, setColumns] = useState([
    { id: 10, seq: 1, name: "To Do", backgroundcolor: "lightgrey", color: "black" },
    { id: 20, seq: 2, name: "Next up", backgroundcolor: "lightgrey", color: "black" },
    {
      id: 30,
      seq: 3, 
      name: "In Progress",
      backgroundcolor: "lightgrey",
      color: "black",
    },
    {
      id: 40,
      seq: 4, 
      name: "Ready to Release",
      backgroundcolor: "lightgrey",
      color: "black",
    },
    { id: 50, seq: 5, name: "Done", backgroundcolor: "lightgreen", color: "black" },
  ]);

  const [cards, setCards] = useState([
    {
      id: 1,
      name: "Create Change Password Screen",
      col: 10,
      prefix: "Web",
      priority: 1,
      type: "bug",
      parent: 100,
    },
    { id: 2, name: "Card 2", col: 10, prefix: "Web", type: "task",
    backgroundcolor: "lightblue",
    color: "black", },
    {
      id: 100,
      name: "Example Epic",
      col: 10,
      prefix: "Web",
      type: "epic",
      backgroundcolor: "green",
      color: "white",
    },
    {
      id: 101,
      name: "Blue Epic",
      col: 10,
      prefix: "Web",
      type: "epic",
      backgroundcolor: "blue",
      color: "white",
    },
    {
      id: 3,
      name: "Card 3",
      col: 10,
      prefix: "Web",
      priority: 2,
      backgroundcolor: "lightgreen",
      color: "red",
      type: "story",
    },
    { id: 4, name: "Card 4", col: 10, prefix: "MBL", type: "bug", priority: 3, parent: 101 },
    
    { id: 5, name: "Card Blue", parent: 101, col: 10, prefix: "MBL", type: "bug", priority: 3 },
  ]);

  const [activeCard, setActiveCard] = useState();
  const [activeEpic, setActiveEpic] = useState();

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
    setCards(
      cards.map((item) => {
        if (item.id === card.id) {
          item.col = column.id;
          return { ...item, col: column.id };
        }
        return item;
      })
    );
  };

  const addCard = () => {
    const newCard = {
      id: cards.length + 1,
      prefix: board.code,
      name: "New Card",
      col: board.defaultColumn,
      parent: activeEpic?.id,
    };
    setCards([...cards, newCard]);
    return newCard;
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
  };

  const changeColumnOrder = (dragData, overItem) => {
    const dragIndex = columns.findIndex((column) => column.id === dragData.id);
    let overIndex = columns.findIndex((column) => column.id === overItem.id);
    let newColumns = [...columns];
    newColumns.splice(dragIndex, 1);
    if (dragIndex < overIndex) {
      overIndex--;
  }
    newColumns.splice(overIndex, 0, dragData);
    newColumns = newColumns.map((column, index) => {
      return {...column, seq: index};
    });
    console.log(newColumns);
    setColumns(newColumns);
  }

  const epics = cards.filter((card) => card.type === "epic");
  const tasks = cards.filter((card) => !activeEpic || card.parent == activeEpic.id || (card.id == activeEpic.id && card.type === "epic"));

  //   useEffect(() => {
  //     fetch(process.env.REACT_APP_Board_API + "params.php", {
  //       headers: { "Content-Type": "application/json", "APP_ID": Board },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setParams(data.params);
  //       })
  //   }, [Board]);

  const contextValue = useMemo(
    () => ({
      board, setBoard,
      columns, setColumns, changeColumnOrder,
      cards: tasks,
      epics,
      setCards,
      changeCardOrder,
      moveCardToColumn,
      addCard,
      updateCard,
      activeCard,
      setActiveCard,activeEpic, setActiveEpic,
    }),
    [
      board, setBoard, 
      columns, setColumns, changeColumnOrder,
      cards,
      setCards,
      changeCardOrder,
      moveCardToColumn,
      addCard,
      updateCard,
      activeCard,
      setActiveCard, activeEpic, setActiveEpic,
    ]
  );

  return (
    <BoardContext.Provider value={contextValue}>
      {children}
    </BoardContext.Provider>
  );
};

export { BoardContext, BoardProvider };
