import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import ColumnsList from "./columns/columnslist";
import { Row, Col, CloseButton } from "react-bootstrap";
import BoardSettings from "./board/boardsettings";

const Settings = () => {
  const [key, setKey] = useState('home');

  return (
    <>
      <Row>
        <Col>
          <h1 className="float-start">
            Settings
          </h1>
          <CloseButton className="float-end mt-3 me-3" onClick={() => (window.location.hash = "")} />
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
          <BoardSettings />
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
