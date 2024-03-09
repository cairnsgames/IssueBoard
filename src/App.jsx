import React from "react";
import { createRoot } from "react-dom/client";

import NavBar from "./header/navbar";
import "./index.scss";
import { Container } from "react-bootstrap";
import KanbanBoard from "./board/board";
import Providers from "./provider/providers";
import useLocation from "./hooks/uselocation";
import Settings from "./settings/settings";
import Toasts from "./toasts/toasts";

const App = () => {
  const { hash } = useLocation();

  return (
    <Providers user={{id: 1, username: "William"}}>
      <Container fluid>
        <NavBar />
        {hash === "settings" && <Settings />}
        {(hash.startsWith("board") || hash === "") && (
          <KanbanBoard title="Board" />
        )}
      </Container>
      <Toasts />
    </Providers>
  );
};

const container = document.getElementById("app");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
