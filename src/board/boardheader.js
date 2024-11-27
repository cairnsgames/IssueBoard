import { Button, Col, Row } from "react-bootstrap";
import { useBoard } from "../provider/useboard";
import { Gear } from "react-bootstrap-icons";
import TypeSelector from "../components/typeselector";
import SelectEpic from "../components/SelectEpic"; // Importing the new component

const BoardHeader = () => {
  const {
    board,
    activeSearch,
    setActiveSearch,
    addCard,
    setActiveCard,
  } = useBoard();

  const selectCardType = (type) => {
    if (type === "all") {
      // remove the type from the search
      const newSearch = { ...activeSearch };
      delete newSearch.type;
      setActiveSearch(newSearch);
    } else {
      setActiveSearch({ ...activeSearch, type });
    }
  };
  return (
    <div className="board-header">
      <Row>
        <Col xs={12} lg={6}>
          <h1>
            <Button
              onClick={() => {
                window.location.hash = "settings";
              }}
              variant="light"
            >
              <Gear size="24" />
            </Button>{" "}
            {board.name}
          </h1>
        </Col>
        <Col xs={2} lg={1} className="mt-2 ms-1">
          <TypeSelector
            selectedType={activeSearch.type}
            onSelect={selectCardType}
          />
        </Col>
        <Col xs={2} lg={1} className="mt-2">
          <Button
            onClick={() => {
              const newCard = addCard();
              setActiveCard(newCard);
            }}
          >
            Add
          </Button>
        </Col>
        <Col className="mt-2 me-1">
          <SelectEpic /> {/* Using the new component without props */}
        </Col>
      </Row>
    </div>
  );
};

export default BoardHeader;
