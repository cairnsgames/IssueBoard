import React from "react";
import { Form } from "react-bootstrap";
import { useBoard } from "../provider/useboard"; // Importing useBoard

const SelectEpic = () => {
  const { activeEpic, setActiveEpic, epics } = useBoard(); // Accessing values directly from useBoard

  return (
    <Form.Select
      value={activeEpic?.id}
      onChange={(e) => {
        let valueNum = e.target.value ? parseInt(e.target.value) : 0;
        const findEpic = epics.find((epic) => epic.id === valueNum);
        setActiveEpic(findEpic);
      }}
    >
      <option value={0}>Show all Cards</option>
      {epics.map((epic) => {
        return (
          <option value={epic.id} key={epic.id}>
            {epic.name}
          </option>
        );
      })}
    </Form.Select>
  );
};

export default SelectEpic;
