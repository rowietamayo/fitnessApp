import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import WorkoutContext from "../context/WorkoutContext";

export default function UpdateWorkout({ workout }) {
  const { fetchWorkout } = useContext(WorkoutContext);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    if (showEdit && workout) {
      setName(workout.name);
      setDuration(workout.duration);
    }
  }, [showEdit]);

  const openEdit = () => {
    setShowEdit(true);
  };

  const closeEdit = () => {
    setShowEdit(false);
  };

  const updateWorkout = (e) => {
    e.preventDefault();
    fetch(
      `https://fitnessapp-api-ln8u.onrender.com/workouts/updateWorkout/${workout._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: name,
          duration: duration,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error !== "Workout not found") {
          Swal.fire({
            title: "Success!",
            icon: "success",
            text: "Workout Successfully edited",
            customClass: {
              confirmButton: "sweet-warning",
            },
          });
        } else {
          Swal.fire({
            title: "Error!",
            icon: "error",
            text: "Please try again",
            customClass: {
              confirmButton: "sweet-warning",
            },
          });
          console.log(data.error);
        }
        setName("");
        setDuration("");
        fetchWorkout();
        closeEdit();
      });
  };

  return (
    <>
      <Button
        className="btnUpdate me-2"
        variant="primary"
        size="sm"
        onClick={openEdit}
      >
        Edit
      </Button>

      <Modal id="update-modal" show={showEdit} onHide={closeEdit}>
        <Form onSubmit={updateWorkout}>
          <Modal.Header closeButton>
            <Modal.Title>Update Workout</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="workoutName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="workoutDuration">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="text"
                required
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeEdit}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

UpdateWorkout.propTypes = {
  workout: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    duration: PropTypes.string,
  }),
};
