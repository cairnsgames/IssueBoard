import React from "react";
import { Dropdown } from "react-bootstrap";
import { ChevronRight } from "react-bootstrap-icons";
import Priority from "./priority";

const PriorityDropdown = ({ currentPriority, setPriority }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="light"
        align={"end"}
        style={{
          width: "100%",
          textAlign: "left",
        }}
      >
        <div>
          Priority{" "}
          <ChevronRight className="mt-1" style={{ float: "right" }} />
          <Priority level={currentPriority} />
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {[1, 2, 3, 4, 5, 6].map((level) => (
          <Dropdown.Item key={level} onClick={() => setPriority(level)}>
            Priority {level}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default PriorityDropdown;
