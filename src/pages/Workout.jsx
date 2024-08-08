import { useContext, useEffect } from "react";
import { Col, Row, Table } from "react-bootstrap";
import AddWorkout from "../components/AddWorkout";
import CompleteWorkout from "../components/CompleteWorkout";
import DeleteWorkout from "../components/DeleteWorkout";
import UpdateWorkout from "../components/UpdateWorkout";
import WorkoutContext from "../context/WorkoutContext";

export default function Workouts() {
  const { workout, fetchWorkout } = useContext(WorkoutContext);

  useEffect(() => {
    fetchWorkout();
  }, [fetchWorkout]);

  return workout.length === 0 ? (
    <Row>
      <Col className="text-center mx-auto">
        <h1>No Workouts</h1>
        <AddWorkout />
      </Col>
    </Row>
  ) : (
    <>
      <h2 className="text-center my-4">Your Workout List</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr className="text-center table-dark">
            <th>Name</th>
            <th>Duration</th>
            <th>Status</th>
            <th>Date</th>
            <th colSpan="2"> Actions </th>
          </tr>
        </thead>

        <tbody>
          {workout.map((workoutItem) => {
            const workoutId = workoutItem._id;
            return (
              <tr key={workoutId}>
                <td>{workoutItem.name}</td>
                <td>{workoutItem.duration}</td>
                <td>{workoutItem.status}</td>
                <td>{new Date(workoutItem.dateAdded).toLocaleString()}</td>

                <td className="text-center">
                  {workoutItem.status === "pending" && (
                    <CompleteWorkout workoutId={workoutId} />
                  )}
                  <UpdateWorkout workout={workoutItem} />
                  <DeleteWorkout workoutId={workoutId} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <AddWorkout />
    </>
  );
}
