import React from "react";
import { Dropdown } from "react-bootstrap";
import Priority from "../components/priority";

const PriorityQuickSelect = ({ setPriority, card }) => {
  return (
    <Dropdown style={{ float: "right" }}>
      <Dropdown.Toggle style={{ backgroundColor: "transparent", borderColor: "transparent" }}>
        <Priority level={card.priority} />
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => setPriority(1)}>Priority 1</Dropdown.Item>
        <Dropdown.Item onClick={() => setPriority(2)}>Priority 2</Dropdown.Item>
        <Dropdown.Item onClick={() => setPriority(3)}>Priority 3</Dropdown.Item>
        <Dropdown.Item onClick={() => setPriority(4)}>Priority 4</Dropdown.Item>
        <Dropdown.Item onClick={() => setPriority(5)}>Priority 5</Dropdown.Item>
        <Dropdown.Item onClick={() => setPriority(6)}>Priority 6</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default PriorityQuickSelect;
