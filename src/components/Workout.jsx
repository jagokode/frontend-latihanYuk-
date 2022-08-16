import axios from "axios";
import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const Workout = ({ workout }) => {
  const { user } = useAuthContext();
  const { dispatch } = useWorkoutContext();
  const [error, setError] = useState(null);
  // const date = new Date(workout.createdAt);
  // const timestamp = `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`;

  const handleDelete = async () => {
    try {
      if (!user) return;

      const response = await axios.delete(
        `http://localhost:8000/api/workouts/${workout._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      dispatch({ type: "DELETE_WORKOUT", payload: response.data });
    } catch (error) {
      console.log(error);
      setError(error.response.data.error);
    }
  };
  return (
    <div className="workout-details">
      <h3>{workout.title}</h3>
      <p>
        <strong>Beban (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Pengulangan: </strong>
        {workout.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      {/* <p>{timestamp}</p> */}
      <span className="material-symbols-outlined" onClick={handleDelete}>
        delete
      </span>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Workout;
