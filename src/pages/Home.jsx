import { useEffect } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";
import Workout from "../components/Workout";
import Form from "../components/Form";

const Home = () => {
  const { workout, dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/workouts", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      dispatch({ type: "SET_WORKOUT", payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="workouts">
        {workout !== null ? (
          workout?.map((wo) => {
            console.log(wo);
            return <Workout key={wo._id} workout={wo} />;
          })
        ) : (
          <div>
            <h3>Workouts is empty</h3>
          </div>
        )}
      </div>
      <Form />
    </div>
  );
};

export default Home;
