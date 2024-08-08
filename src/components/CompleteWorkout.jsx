import PropTypes from "prop-types";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import WorkoutContext from "../context/WorkoutContext";

export default function CompleteWorkout({ workoutId }) {
  const { fetchWorkout } = useContext(WorkoutContext);

  const removeToggle = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Are you done with this workout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, I am done!",
      cancelButtonText: "No, cancel",
      customClass: {
        confirmButton: "sweet-confirm",
        cancelButton: "sweet-cancel",
      },
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `https://fitnessapp-api-ln8u.onrender.com/workouts/completeWorkoutStatus/${workoutId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.message);

        if (
          data.error !== "Error in updating an Workout." ||
          data.error !== "Workout not found"
        ) {
          Swal.fire({
            title: "Success",
            icon: "success",
            text: "Workout completed",
            customClass: {
              confirmButton: "sweet-warning",
            },
          });
          fetchWorkout();
        } else {
          Swal.fire({
            title: "Something Went Wrong",
            icon: "error",
            text: "Please try again",
            customClass: {
              confirmButton: "sweet-warning",
            },
          });
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Failed to complete workout. Please try again later.",
          customClass: {
            confirmButton: "sweet-warning",
          },
        });
      }
    } else if (result.isDismissed) {
      Swal.fire({
        title: "Cancelled",
        text: "Workout completion cancelled.",
        icon: "info",
        customClass: {
          confirmButton: "sweet-warning",
        },
      });
    }
  };

  return (
    <Button
      className="btnComplete me-2"
      variant="success"
      size="sm"
      onClick={removeToggle}
    >
      Complete
    </Button>
  );
}

CompleteWorkout.propTypes = {
  workoutId: PropTypes.string.isRequired,
};
