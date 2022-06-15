import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Validator from "simple-react-validator";
const Address = (props) => {
  const dispatch = useDispatch();
  const [allValues, setAllValue] = useState({
    address: props.data.address,
    city: props.data.city,
    state: props.data.state,
    pincode: props.data.pincode,
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
        dispatch({ type: "SET_GO_STEPS", payload: 2 });
        const data = {
          address: allValues.address,
          city: allValues.city,
          state: allValues.state,
          pincode: allValues.pincode,
        };
        dispatch({ type: "BASIC_INFO", payload: data });
      } else {
        validator.current.showMessages();
      }
    },
  };
  return (
    <div>
      <Form onSubmit={(e) => handle.submit(e)}>
        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Address"
            value={allValues.address}
            onChange={(e) => {
              handle.change(e.target.value, "address");
            }}
          />
          <p style={{ color: "red" }}>
            {validator.current.message(
              "address",
              allValues.address,
              "required|alpha_space|min:2|max:100"
            )}
          </p>
        </Form.Group>
        <Form.Group>
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter City"
            value={allValues.city}
            onChange={(e) => {
              handle.change(e.target.value, "city");
            }}
          />
          <p style={{ color: "red" }}>
            {validator.current.message(
              "city",
              allValues.city,
              "required|alpha_space|min:2|max:100"
            )}
          </p>
        </Form.Group>
        <Form.Group>
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter State"
            value={allValues.state}
            onChange={(e) => {
              handle.change(e.target.value, "state");
            }}
          />
          <p style={{ color: "red" }}>
            {validator.current.message(
              "state",
              allValues.state,
              "required|alpha_space|min:2|max:100"
            )}
          </p>
        </Form.Group>
        <Form.Group>
          <Form.Label>Pin Code</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Pincode"
            value={allValues.pincode}
            onChange={(e) => {
              handle.change(e.target.value, "pincode");
            }}
          />
          <p style={{ color: "red" }}>
            {validator.current.message(
              "pincode",
              allValues.pincode,
              "required"
            )}
          </p>
        </Form.Group>
        <Button
          variant="success"
          type="submit"
          onClick={() => {
            dispatch({ type: "SET_GO_STEPS", payload: 0 });
          }}
        >
          Previous
        </Button>
        <Button variant="success" type="submit">
          Next
        </Button>
      </Form>
    </div>
  );
};

export default Address;
