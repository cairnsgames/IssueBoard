import { useState, useRef, useEffect } from "react";
import { IssueIcon } from "../utils/icons";
import {
  Modal,
  Form,
  Button,
  Row,
  Col,
  Dropdown,
  InputGroup,
  Spinner,
  Breadcrumb,
} from "react-bootstrap";
import { useBoard } from "../provider/useboard";
import ColorPicker from "../components/colorpicker";
import { getTextColor } from "../utils/color";

const EditTask = (props) => {
  console.log("Edit Card", props);
  const { close, saveCard } = props;
  const [card, setCard] = useState(props.card);
  const { epics, columns } = useBoard();
  const formRef = useRef();

  useEffect(() => {
    console.log("Card updated", card);
  }, [card]);

  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (props.card) {
      setCard(props.card);
    }
  }, [props.card]);

  if (!card) {
    console.log("No card to edit");
    return <Spinner />;
  }

  const handleSave = (event) => {
    const form = formRef.current;
    const valid = form.checkValidity();
    console.log("Valid", valid, form);
    if (valid === false) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }

    setValidated(true);

    if (valid) {
      // Call the Provider to update this card to its new values
      console.log("Update Card", card);
      saveCard(card.id, card);
      close();
    }
  };

  const onClose = () => {
    if (close) {
      close();
    }
  };

  return (
    <Modal size="lg" show={true} onHide={onClose}>
      <Form noValidate validated={validated} ref={formRef}>
        <Modal.Header closeButton>
          <Modal.Title className="w-100">
            <Row>
              <Breadcrumb style={{ fontSize: "12px" }}>
                <Breadcrumb.Item href="#">{card.prefix}</Breadcrumb.Item>
                {card.parent && (
                  <Breadcrumb.Item href={`#board/card?id=${card.parent}`}>
                    {card.parent ?? "No Epic"}
                  </Breadcrumb.Item>
                )}
                <Breadcrumb.Item active>{card.id}</Breadcrumb.Item>
              </Breadcrumb>
            </Row>
            <Row>
              <Col xs={3} sm={3} md={2}>
                <Dropdown className="float-start me-2">
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <IssueIcon type={card?.type} />
                  </Dropdown.Toggle>

                  <Dropdown.Menu style={{ minWidth: "50px" }}>
                    <Dropdown.Item
                      onClick={() => setCard({ ...card, type: "bug" })}
                    >
                      <IssueIcon type="bug" /> Bug
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setCard({ ...card, type: "task" })}
                    >
                      <IssueIcon type="task" /> Technical Task
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setCard({ ...card, type: "story" })}
                    >
                      <IssueIcon type="story" /> User Story
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setCard({ ...card, type: "epic" })}
                    >
                      <IssueIcon type="epic" /> Epic
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>

              <Col xs={9} sm={9} md={10}>
                <Form.Control
                  required
                  className="float-start"
                  type="text"
                  placeholder="Card name"
                  defaultValue={card.name}
                  onChange={(e) => setCard({ ...card, name: e.target.value })}
                />
              </Col>
            </Row>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom01">
              <Form.Label>Details</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                placeholder="Details"
                defaultValue={card?.description}
                onChange={(e) =>
                  setCard({ ...card, description: e.target.value })
                }
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Parent</Form.Label>
              <Form.Select
                value={card.parent}
                onChange={(e) => setCard({ ...card, parent: e.target.value })}
              >
                <option value={undefined}>None</option>
                {epics.map((epic) => {
                  return (
                    <option value={epic.id} key={epic.id}>
                      {epic.name}
                    </option>
                  );
                })}
              </Form.Select>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="column">
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={card.col}
                onChange={(e) => setCard({ ...card, col: e.target.value })}
              >
                {columns.map((column) => {
                  return (
                    <option value={column.id} key={column.id}>
                      {column.name}
                    </option>
                  );
                })}
              </Form.Select>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Card Background</Form.Label>
              <ColorPicker
                value={card.backgroundcolor ?? "white"}
                onChange={(val) =>
                  setCard({
                    ...card,
                    backgroundcolor: val,
                    color: getTextColor(val),
                  })
                }
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditTask;
