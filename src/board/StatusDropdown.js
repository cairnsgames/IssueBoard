import React from "react";
import { Dropdown } from "react-bootstrap";
import { ChevronRight } from "react-bootstrap-icons";

const StatusDropdown = ({ columns, setStatus, editCard }) => {
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
          Status{" "}
          <ChevronRight className="mt-1" style={{ float: "right" }} />
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {columns.map((col) => {
          return (
            <Dropdown.Item key={col.id} onClick={() => setStatus(col.id)}>
              {col.name}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default StatusDropdown;
