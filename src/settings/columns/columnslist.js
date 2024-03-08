
import { useState } from "react";
import { ListGroup, Form, InputGroup, Button } from "react-bootstrap";
import { useBoard } from "../../provider/useboard";
import { useToasts } from "../../provider/usetoasts";
import ColumnItem from "./columnitem";

const ColumnsList = () => {
  const { columns, changeColumnOrder, deleteColumn, addColumn, updateColumn } = useBoard();
  const { addToast } = useToasts();

  const [newColumnName, setNewColumnName] = useState("Test");

  const moveUp = (column) => {
    const dragIndex = columns.findIndex((col) => col.id === column.id);
    changeColumnOrder(column, columns[dragIndex - 1]);
  };
  const moveDown = (column) => {
    const dragIndex = columns.findIndex((col) => col.id === column.id);
    changeColumnOrder(columns[dragIndex + 1], column);
  };
  const deleteCol = (column) => {
    try {
      deleteColumn(column);
    } catch (error) {
      addToast("Cannot delete column: " + column.name, error.message, "danger");
    }
  };
  const addNewColumn = () => {
    try {
      addColumn(newColumnName);
      addToast(
        "Column Added",
        "New Column: " + newColumnName + " added",
        "success"
      );
    } catch (error) {
      addToast("Cannot add column: " + newColumnName, error.message, "danger");
    }
  };

  return (
    <div>
      <ListGroup>
        {columns.map((column, index) => {
          return (
            <ColumnItem
              key={column.id}
              index={index}
              count={columns.length}
              column={column}
              moveUp={moveUp}
              moveDown={moveDown}
              deleteColumn={deleteCol}
              updateColumn={updateColumn}
            />
          );
        })}
      </ListGroup>
      <div className="mt-3">
        <h3>Add new Column</h3>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="New Group Name"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={newColumnName}
            onChange={(e) => setNewColumnName(e.target.value)}
          />
          <Button variant="outline-secondary" onClick={addNewColumn}>
            Add
          </Button>
        </InputGroup>
      </div>
    </div>
  );
};

export default ColumnsList;
