import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Validator from "simple-react-validator"; /* React Validator */
const Education = (props) => {
  const dispatch = useDispatch();
  const [allValues, setAllValue] = useState({
    collage: props.data.collage,
    course: props.data.course,
    cgpa: props.data.cgpa,
  });
  const [showData, setShowData] = useState(true);
  const validator = useRef(
    new Validator({
      element: (message, className) => <div className={"error"}>{message}</div>,
    })
  );
  var str = JSON.stringify(props, null, 2);
  const handle = {
    change: (e, name) => {
      setAllValue({ ...allValues, [name]: e });
    },
    submit: async (e) => {
      e.preventDefault();
      if (validator.current.allValid()) {
        dispatch({ type: "SET_GO_STEPS", payload: 2 });
        const data = {
          collage: allValues.collage,
          course: allValues.course,
          cgpa: allValues.cgpa,
        };
        await dispatch({ type: "BASIC_INFO", payload: data });
        setShowData(true);
      } else {
        validator.current.showMessages();
      }
    },
  };
  return (
    <div>
      <Form onSubmit={(e) => handle.submit(e)}>
        <Form.Group>
          <Form.Label>Collage Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Collage Name"
            value={allValues.collage}
            onChange={(e) => {
              handle.change(e.target.value, "collage");
            }}
          />
          <p style={{ color: "red" }}>
            {validator.current.message(
              "collage",
              allValues.collage,
              "required|alpha_space|min:2|max:100"
            )}
          </p>
        </Form.Group>
        <Form.Group>
          <Form.Label>Course</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Course"
            value={allValues.course}
            onChange={(e) => {
              handle.change(e.target.value, "course");
            }}
          />
          <p style={{ color: "red" }}>
            {validator.current.message(
              "course",
              allValues.course,
              "required|alpha_space|min:2|max:100"
            )}
          </p>
        </Form.Group>
        <Form.Group>
          <Form.Label>CGPA</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter CGPA"
            value={allValues.cgpa}
            onChange={(e) => {
              handle.change(e.target.value, "cgpa");
            }}
          />
          <p style={{ color: "red" }}>
            {validator.current.message(
              "cgpa",
              allValues.cgpa,
              "required|alpha_space|min:2|max:100"
            )}
          </p>
        </Form.Group>
        <Button
          variant="success"
          type="submit"
          onClick={() => {
            dispatch({ type: "SET_GO_STEPS", payload: 1 });
          }}
        >
          Previous
        </Button>
        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
      {showData && str}
    </div>
  );
};

export default Education;
