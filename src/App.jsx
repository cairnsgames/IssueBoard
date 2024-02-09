import React from "react";
import { createRoot } from "react-dom/client";

import NavBar from "./header/navbar";
import "./index.scss";
import { Button, Card, Container } from "react-bootstrap";
import KanbanBoard from "./board/board";
import { BoardProvider } from "./provider/boardprovider";

const App = () => (
  <BoardProvider>
    <Container fluid>
      <NavBar />
      <Button variant="secondary">Primary</Button>
      <KanbanBoard title="Board" />
    </Container>
  </BoardProvider>
);
// ReactDOM.render(<App />, document.getElementById("app"));

const container = document.getElementById("app");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
