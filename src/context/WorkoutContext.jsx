import PropTypes from "prop-types";
import React, { useState } from "react";

const WorkoutContext = React.createContext();

export const WorkoutProvider = ({ children }) => {
  const [workout, setWorkout] = useState([]);

  const fetchWorkout = () => {
    let fetchUrl =
      "https://fitnessapp-api-ln8u.onrender.com/workouts/getMyWorkouts";

    fetch(fetchUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "No Workouts found.") {
          setWorkout([]);
        } else {
          setWorkout(data.workouts);
        }
      });
  };

  return (
    <WorkoutContext.Provider value={{ workout, fetchWorkout }}>
      {children}
    </WorkoutContext.Provider>
  );
};

WorkoutProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WorkoutContext;
