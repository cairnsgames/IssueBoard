import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { Gear } from "react-bootstrap-icons";
import ColumnsList from "./columnslist";
import { Row, Col, CloseButton } from "react-bootstrap";

const Settings = () => {
  const [key, setKey] = useState('home');

  return (
    <>
      <Row>
        <Col>
          <h1 className="float-start">
            Settings
          </h1>
          <CloseButton variant="light" className="float-end mt-3 me-3" onClick={() => (window.location.hash = "")} />
        </Col>
      </Row>
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
      variant="pills"
    >
        <Tab eventKey="home" title="Board">
          <ColumnsList />
        </Tab>
        <Tab eventKey="columns" title="Columns">
          <ColumnsList />
        </Tab>
        <Tab eventKey="contact" title="Contact">
          Tab content for Contact
        </Tab>
      </Tabs>
    </>
  );
};

export default Settings;
