import { Button, Col, Form, Row } from "react-bootstrap";
import { useBoard } from "../provider/useboard";
import { Gear } from "react-bootstrap-icons";

const BoardHeader = () => {
  const { board, setBoard, epics, activeEpic, setActiveEpic } = useBoard();
  return (
    <div className="board-header">
      <Row>
        <Col xs={12} md={6}>
          <h1>
            <Button onClick={()=>{window.location.hash = "settings"}} variant="light">
              <Gear size="24" />
            </Button>{" "}
            {board.name}
          </h1>
        </Col>
        <Col xs={6}>
          <Form.Select
            className="mt-2"
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
        </Col>
        {/* <Col>
          <Form.Check // prettier-ignore
            type="checkbox"
            label="Show Epics"
            checked={board.includeEpics}
            onChange={(e) => {
              console.log("Include Epics Check box changed", e.target.value);
              setBoard({ ...board, includeEpics: e.target.checked });
            }}
          />
        </Col> */}
      </Row>
    </div>
  );
};

export default BoardHeader;
