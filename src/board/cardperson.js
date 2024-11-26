import React from "react";
import Avatar from "react-avatar";
import { PersonCircle } from "react-bootstrap-icons";
import { useState } from "react";
import { useBoard } from "../provider/useboard";
import { Dropdown } from "react-bootstrap";

const CardPerson = ({ card, id, onSelect }) => {
  const { getPerson, users } = useBoard();
  const person = getPerson(id);

  return (
    <Dropdown style={{ float: "right" }}>
      <Dropdown.Toggle
        style={{ backgroundColor: "transparent", borderColor: "transparent" }}
      >
        {!person ? (
          <PersonCircle size="20" />
        ) : (
          <Avatar
            style={{ verticalAlign: "none", marginTop: `${person.avatar ? "0px" : "4px"}` }}
            name={person.username}
            size="20"
            round={true}
            src={person.avatar}
          />
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item key={0} onClick={()=>onSelect(card, undefined)}>
          <PersonCircle size="20" /> Unassign
        </Dropdown.Item>
        {users.map((user) => {
          return (
            <Dropdown.Item key={user?.id} onClick={()=>onSelect(card, user?.id)}>
              {!user ? (
                <PersonCircle size="20" />
              ) : (
                <Avatar
                  style={{ verticalAlign: "none" }}
                  name={user.username}
                  size="20"
                  round={true}
                  src={user.avatar}
                />
              )}{" "}
              {user?.username || "Username"}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CardPerson;
