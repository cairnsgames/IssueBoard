import { useState } from "react";
import { IssueIcon } from "./utils";
import {
  Modal,
  Form,
  Button,
  Row,
  Col,
  Dropdown,
  InputGroup,
} from "react-bootstrap";
import { useBoard } from "../provider/useboard";
import ColorPicker from "./colorpicker";
import { getTextColor } from "./utils";

const EditTask = (props) => {
  const { card, setCard, close, saveCard } = props;
  const { epics, columns } = useBoard();

  console.log("EditTask", card)

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    const valid = form.checkValidity();
    if (valid === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    if (valid) {
      // Call the Provider to update this card to its new values
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
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title className="w-100">
            <Row>
              <Col xs={3} sm={3} md={2}>
                <Dropdown className="float-start me-2">
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <IssueIcon type={card.type} />
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
              <Form.Select value={card.parent} onChange={(e)=>setCard({...card, parent: e.target.value})}>
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
              <Form.Select value={card.col} onChange={(e)=>setCard({...card, col: e.target.value})}>
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
              <ColorPicker value={card.backgroundcolor ?? "white"} onChange={(val) => setCard({...card, backgroundcolor: val, color: getTextColor(val)})} />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Username</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  aria-describedby="inputGroupPrepend"
                  // required
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a username.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          {/* <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="City" required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid city.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom04">
              <Form.Label>State</Form.Label>
              <Form.Control type="text" placeholder="State" required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid state.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom05">
              <Form.Label>Zip</Form.Label>
              <Form.Control type="text" placeholder="Zip" required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid zip.
              </Form.Control.Feedback>
            </Form.Group>
          </Row> */}
          <Form.Group className="mb-3">
            <Form.Check
              // required
              label="Agree to terms and conditions"
              feedback="You must agree before submitting."
              feedbackType="invalid"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button type="submit" variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditTask;
