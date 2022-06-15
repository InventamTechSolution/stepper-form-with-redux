import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Validator from "simple-react-validator";
const BasicInfo = (props) => {
  const dispatch = useDispatch();

  const [allValues, setAllValue] = useState({
    name: props.data.name,
    lastName: props.data.lastName,
    email: props.data.email,
  });
  const validator = useRef(
    new Validator({
      element: (message, className) => <div className={"error"}>{message}</div>,
    })
  );

  const handle = {
    change: (e, name) => {
      setAllValue({ ...allValues, [name]: e });
    },
    submit: (e) => {
      e.preventDefault();
      if (validator.current.allValid()) {
        dispatch({ type: "SET_GO_STEPS", payload: 1 });
        const data = {
          name: allValues.name,
          lastName: allValues.lastName,
          email: allValues.email,
        };
        dispatch({
          type: "BASIC_INFO",
          payload: data,
        });
      } else {
        validator.current.showMessages();
      }
    },
  };

  return (
    <div>
      <Form onSubmit={(e) => handle.submit(e)}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={allValues.name}
            onChange={(e) => {
              handle.change(e.target.value, "name");
            }}
          />
          <p style={{ color: "red" }}>
            {validator.current.message(
              "name",
              allValues.name,
              "required|alpha_space|min:2|max:100"
            )}
          </p>
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your last name"
            value={allValues.lastName}
            onChange={(e) => {
              handle.change(e.target.value, "lastName");
            }}
          />
          <p style={{ color: "red" }}>
            {validator.current.message(
              "lastName",
              allValues.lastName,
              "required|alpha_space|min:2|max:100"
            )}
          </p>
        </Form.Group>
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={allValues.email}
            onChange={(e) => {
              handle.change(e.target.value, "email");
            }}
          />
          <p style={{ color: "red" }}>
            {validator.current.message(
              "email",
              allValues.email,
              "required|email"
            )}
          </p>
        </Form.Group>
        <Button variant="success" type="submit">
          Next
        </Button>
      </Form>
    </div>
  );
};

export default BasicInfo;
