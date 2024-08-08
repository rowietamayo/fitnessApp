import { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import WorkoutContext from "../context/WorkoutContext";

export default function AddWorkout() {
  const { fetchWorkout } = useContext(WorkoutContext);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [showEdit, setShowEdit] = useState(false);

  const openEdit = () => {
    setShowEdit(true);
  };

  const closeEdit = () => {
    setShowEdit(false);
  };

  const addWorkout = (e) => {
    e.preventDefault();
    fetch(`https://fitnessapp-api-ln8u.onrender.com/workouts/addWorkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: name,
        duration: duration,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.error !== "Failed to save the Workout") {
          Swal.fire({
            title: "Success!",
            icon: "success",
            text: "Workout Successfully added",
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
        className="btnUpdate"
        variant="primary"
        size="sm"
        onClick={openEdit}
      >
        Add Workout
      </Button>

      <Modal id="update-modal" show={showEdit} onHide={closeEdit}>
        <Form onSubmit={addWorkout}>
          <Modal.Header closeButton>
            <Modal.Title>Add Workout</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="workoutName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="workoutDuration">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="text"
                required
                name="duration"
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
