import React from "react";
import { createRoot } from "react-dom/client";

import NavBar from "./header/navbar";
import "./index.scss";
import { Button, Card, Container } from "react-bootstrap";
import KanbanBoard from "./board/board";
import { BoardProvider } from "./provider/boardprovider";
import useLocation from "./hooks/uselocation";
import Settings from "./settings/settings";

const App = () => {
  const { hash } = useLocation();

  return (
    <BoardProvider>
      <Container fluid>
        <NavBar />
        {hash === "settings" && <Settings />}
        {(hash.startsWith("board") || hash === "") && (
          <KanbanBoard title="Board" />
        )}
      </Container>
    </BoardProvider>
  );
};

const container = document.getElementById("app");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
