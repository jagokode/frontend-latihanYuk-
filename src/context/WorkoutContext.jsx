import { createContext, useReducer } from "react";

export const WorkoutContext = createContext();

export const workoutReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUT":
      return {
        workout: action.payload,
      };
      break;
    case "CREATE_WORKOUT":
      return {
        workout: [action.payload, ...state.workout],
      };
      break;
    case "DELETE_WORKOUT":
      return {
        workout: state.workout?.filter((wo) => wo._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutReducer, { workout: [] });

  return (
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};
