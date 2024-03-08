import React from "react";
import { Dropdown } from "react-bootstrap";
import { IssueIcon } from "./utils";


const TypeSelector = ({ types, selectedType = "all", onSelect = () => {}}) => {
    return (<Dropdown className="float-start me-2">
    <Dropdown.Toggle variant="success" id="dropdown-basic">
      <IssueIcon type={selectedType} />
    </Dropdown.Toggle>

    <Dropdown.Menu style={{ minWidth: "50px" }}>
        
      <Dropdown.Item
        onClick={()=>onSelect("all")}
      >
        <IssueIcon type="all" /> All
      </Dropdown.Item>
      <Dropdown.Item
        onClick={()=>onSelect("bug")}
      >
        <IssueIcon type="bug" /> Bug
      </Dropdown.Item>
      <Dropdown.Item
        onClick={()=>onSelect("task")}
      >
        <IssueIcon type="task" /> Technical Task
      </Dropdown.Item>
      <Dropdown.Item
        onClick={()=>onSelect("story")}
      >
        <IssueIcon type="story" /> User Story
      </Dropdown.Item>
      <Dropdown.Item
        onClick={()=>onSelect("epic")}
      >
        <IssueIcon type="epic" /> Epic
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>);

}

export default TypeSelector;