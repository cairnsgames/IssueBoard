import React, { useState } from "react";
import {ButtonGroup, Form, Button, ListGroup, Row, Col} from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { ArrowDownSquare, ArrowUpSquare, PencilSquare, Trash } from "react-bootstrap-icons";
import ColumnItemForm from "./columnitemform";

const ColumnItem = (props) => {
    const { column, count, index, moveUp, moveDown, deleteColumn, updateColumn } = props;
  
    const [edit, setEdit] = useState(false);  

    return (
      <ListGroup.Item>
        <Row>
          <Col xs={2}>
            <ButtonGroup>
              <Button
                style={{ width: "45px" }}
                variant="light"
                className="float-start"
                disabled={index === 0}
                onClick={() => moveUp(column)}
              >
                {index > 0 && <ArrowUpSquare />}
              </Button>
              <Button
                style={{ width: "45px" }}
                variant="light"
                disabled={index === count - 1}
                onClick={() => moveDown(column)}
              >
                {index < count - 1 && <ArrowDownSquare />}
              </Button>
            </ButtonGroup>
          </Col>
          <Col style={{backgroundColor: column.backgroundcolor, color: column.color}}>
            {!edit && <div className="mt-1">{column.name}</div>}
            {edit && (
              <ColumnItemForm column={column} setEdit={setEdit} updateColumn={updateColumn} />
            )}
          </Col>
          <Col xs={3}>
            <Button variant="light" onClick={() => setEdit(edit => !edit)}>
              <PencilSquare />
            </Button>
            <Button variant="light" onClick={() => deleteColumn(column)}>
              <Trash />
            </Button>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  };

export default ColumnItem;