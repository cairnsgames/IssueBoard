import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useBoard } from "../../provider/useboard";

const BoardSettings = () => {
  const [validated, setValidated] = useState(false);
  const { board, updateBoard, columns } = useBoard();
  const [name, setName] = useState(board.name);
  const [code, setCode] = useState(board.code);
  const [defaultColumn, setDefaultColumn] = useState(board.defaultColumn);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      console.log("invalid")
        return;

    }
    console.log("valid")
    updateBoard({
      ...board,
      name: name,
      code: code,
      defaultColumn: defaultColumn,
    });

    setValidated(true);
  };

  const changeCode = (event) => {
    if (event.target.value.length > 5) {
      return;
    }
    console.log("changeCode", event.target.value);
    setCode(event.target.value);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="12" controlId="validationCustom01">
          <Form.Label>Board Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Board name"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
              Your Board must have a name.
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="12" controlId="validationCustom02">
          <Form.Label>Code</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Code"
            value={code}
            onChange={changeCode}
          />
          <Form.Control.Feedback type="invalid">
              Code must be entered and must be less that 5 characters.
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="12" controlId="validationCustomUsername">
          <Form.Label>Default Column</Form.Label>
          <InputGroup hasValidation>
            <Form.Select
              value={defaultColumn}
              onChange={(e) => setDefaultColumn(e.target.value)}
              required
            >
                {columns.map((column) => (
                    <option key={column.id} value={column.id}>
                        {column.name}
                    </option>
                    ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please choose the default column that cards will be added to.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Button type="submit">Submit form</Button>
    </Form>
  );
};

export default BoardSettings;
