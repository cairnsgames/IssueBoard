import React, { createContext, useEffect, useMemo, useState } from "react";
import { useToasts } from "./usetoasts";
import { useAudit } from "./useaudit";

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

  const { addToast } = useToasts();

  const [board, setBoard] = useState({
    id: 1,
    name: "Kanban Board",
    code: "WEB",
    defaultColumn: 10,
    includeEpics: true,
  });

  const [columns, setColumns] = useState([
    {
      id: 10,
      seq: 1,
      name: "To Do",
      backgroundcolor: "lightgrey",
      color: "black",
    },
    {
      id: 20,
      seq: 2,
      name: "Next up",
      backgroundcolor: "lightgrey",
      color: "black",
    },
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
    {
      id: 50,
      seq: 5,
      name: "Done",
      backgroundcolor: "lightgreen",
      color: "black",
    },
  ]);

  const [cards, setCards] = useState([
    {
      id: 1,
      name: "Create Change Password Screen",
      col: 30,
      prefix: "Web",
      priority: 1,
      type: "bug",
      parent: 100,
    },
    {
      id: 2,
      name: "Card 2",
      col: 10,
      prefix: "Web",
      type: "task",
      backgroundcolor: "lightblue",
      color: "black",
    },
    {
      id: 100,
      name: "Example Epic",
      col: 20,
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
    {
      id: 4,
      name: "Card 4",
      col: 10,
      prefix: "MBL",
      type: "bug",
      priority: 3,
      parent: 101,
      person: 10
    },

    {
      id: 5,
      name: "Card Blue",
      parent: 101,
      col: 10,
      prefix: "MBL",
      type: "bug",
      priority: 3,
      person: 1
    },
  ]);

  const [users, setUsers] = useState([
    { id: 1, username: "William", avatar: "person1.jpeg" },
    { id: 10, username: "Peter Cairns", avatar: undefined }
  ]);

  const [user, setUser] = useState({id: 1, username:"William"});
  const [activeCard, setActiveCard] = useState();
  const [activeEpic, setActiveEpic] = useState();
  const [activeSearch, setActiveSearch] = useState([]);

  const { addAudit, startTransaction, commitTransaction, rollbackTransaction } = useAudit();
  
  const changeCardOrder = (card1, card2) => {
    const tx = startTransaction("card", "update", "Card order changed", card1, card2);
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
    commitTransaction(tx, card1);
  };

  const moveCardToColumn = (card, column) => {
    const tx = startTransaction("card", "update", "Card moved to " + column.name, card, column);
    setCards(
      cards.map((item) => {
        if (item.id === card.id) {
          item.col = column.id;
          return { ...item, col: column.id };
        }
        return item;
      })
    );
    
    commitTransaction(tx, card);
  };

  const updateBoard = (board) => {
    const tx = startTransaction("board", "update", "Board settings updated", board);
    try {
      setBoard(board);
      addToast("Board updated", "Board settings have been updated", "success");
    } catch (error) {
      addToast("Error saving Board", error.message, "danger");
    }
    commitTransaction(tx, board);
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
    addToast("Card added", "A new card has been added", "success");
    addAudit("card", "create", "Card added", newCard);
    return newCard;
  };

  const updateCard = (id, card) => {
    console.log("Update Card", id, card);
    addAudit("card", "update", "Card updated", card);
    setCards(
      cards.map((item) => {
        if (item.id === id) {
          return card;
        }
        return item;
      })
    );
  };
  const addColumn = (title) => {
    const newColumn = {
      id: columns.length + 1,
      name: title,
      backgroundcolor: "lightgrey",
      color: "black",
    };
    
    addAudit("column", "create", "Column added", newColumn);
    setColumns([...columns, newColumn]);
    return newColumn;
  };

  const changeColumnOrder = (dragData, overItem) => {
    const tx = startTransaction("columns", "update", "Column moved to before " + overItem.name, dragData, overItem);
    addColumnAudit(dragData, "update", "Column moved to before " + overItem.name, dragItem);
    const dragIndex = columns.findIndex((column) => column.id === dragData.id);
    let overIndex = columns.findIndex((column) => column.id === overItem.id);
    let newColumns = [...columns];
    newColumns.splice(dragIndex, 1);
    if (dragIndex < overIndex) {
      overIndex--;
    }
    newColumns.splice(overIndex, 0, dragData);
    newColumns = newColumns.map((column, index) => {
      return { ...column, seq: index };
    });
    console.log(newColumns);
    commitTransaction(tx, dragData);
    setColumns(newColumns);
  };

  const deleteColumn = (column) => {
    const tx = startTransaction("columns", "delete", "Column deleted", column);
    console.log("Delete Column", column);
    const cardsInColumn = cards.filter((card) => card.col === column.id);
    if (cardsInColumn.length > 0) {
      throw new Error("You cannot delete a column with cards in it");
    }
    setColumns(
      columns.filter((item) => {
        return item.id !== column.id;
      })
    );
    commitTransaction(tx, column);
  };
  const updateColumn = (column) => {
    const tx = startTransaction("columns", "update", "Column updated", column);
    setColumns(
      columns.map((item) => {
        if (item.id === column.id) {
          return column;
        }
        return item;
      })
    );
    commitTransaction(tx, column);
  };

  const epics = cards.filter((card) => card.type === "epic");
  const tasks = cards.filter(
    (card) =>{
      //for each field in Active Search check if the card matches
      for (let field in activeSearch) {
        if (activeSearch[field] !== "" && card[field] !== activeSearch[field]) {
          return false;
        }
      }
      return !activeEpic ||
      card.parent == activeEpic.id ||
      (card.id == activeEpic.id && card.type === "epic")}
  );

  const getPerson = (id) => {
    return users.find((user) => user.id === id);
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

  const contextValue = useMemo(
    () => ({
      board,
      setBoard,
      updateBoard,
      columns,
      setColumns,
      changeColumnOrder,
      deleteColumn,
      addColumn,
      updateColumn,
      cards: tasks,
      epics,
      setCards,
      changeCardOrder,
      moveCardToColumn,
      addCard,
      updateCard,
      activeCard,
      setActiveCard,
      activeEpic,
      setActiveEpic,
      activeSearch,
      setActiveSearch,
      users, getPerson
    }),
    [
      board,
      setBoard,
      updateBoard,
      columns,
      setColumns,
      changeColumnOrder,
      deleteColumn,
      addColumn,
      updateColumn,
      cards,
      setCards,
      changeCardOrder,
      moveCardToColumn,
      addCard,
      updateCard,
      activeCard,
      setActiveCard,
      activeEpic,
      setActiveEpic,
      activeSearch,
      setActiveSearch,
      users, getPerson
    ]
  );

  return (
    <BoardContext.Provider value={contextValue}>
      {children}
    </BoardContext.Provider>
  );
};

export { BoardContext, BoardProvider };
