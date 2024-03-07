import ListGroup from "react-bootstrap/ListGroup";
import { useBoard } from "../provider/useboard";

const ColumnsList = () => {
  const { columns } = useBoard();
  return (
    <ListGroup>
      {columns.map((column) => {
        return <ListGroup.Item key={column.id}>{column.name}</ListGroup.Item>;
      })}
    </ListGroup>
  );
};

export default ColumnsList;
