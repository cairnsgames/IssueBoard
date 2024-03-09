import React, { useState } from "react";
import { Form, Button, InputGroup, Row, Col } from "react-bootstrap";
import { SketchPicker as ColorPicker } from "react-color";
import { getTextColor } from "../../utils/color";

const ColumnItemForm = ({ column, setEdit, updateColumn }) => {
  const [newColumnName, setNewColumnName] = useState(column.name);
  const [color, setColor] = useState(column.backgroundcolor);

  const editColumn = () => {
    const editedColumn = {
      ...column,
      name: newColumnName,
      backgroundcolor: color,
      color: getTextColor(color)
    };
    updateColumn(editedColumn);
    setEdit(false);
  };

  return (
    <Row>
      <Col xs={12}>
        {" "}
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="New Group Name"
            value={newColumnName}
            onChange={(e) => setNewColumnName(e.target.value)}
          />
          <Button variant="outline-secondary" onClick={editColumn}>
            Save
          </Button>
          <Button variant="outline-secondary" onClick={() => setEdit(false)}>
            Cancel
          </Button>
        </InputGroup>
      </Col>
      <Col xs={6}>
        Color
        <ColorPicker
          color={color}
          onChangeComplete={(color) => setColor(color.hex)}
        />
      </Col>
    </Row>
  );
};

export default ColumnItemForm;
