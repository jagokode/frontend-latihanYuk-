import axios from "axios";
import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Form = () => {
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [kolomKosong, setKolomKosong] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("Anda harus login");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/api/workouts",
        {
          title,
          load,
          reps,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setKolomKosong([]);
      dispatch({ type: "CREATE_WORKOUT", payload: response.data });
    } catch (error) {
      setError(error.response.data.error);
      setKolomKosong(error.response.data.kolomKosong);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create">
      <h3>Tambah Latihan Baru</h3>
      <label>Judul Latihan</label>
      <input
        type="text"
        className={kolomKosong.includes("title") ? "error" : ""}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>Beban (kg):</label>
      <input
        type="text"
        className={kolomKosong.includes("load") ? "error" : ""}
        value={load}
        onChange={(e) => setLoad(e.target.value)}
      />

      <label>Pengulangan:</label>
      <input
        type="text"
        className={kolomKosong.includes("reps") ? "error" : ""}
        value={reps}
        onChange={(e) => setReps(e.target.value)}
      />

      <button>Tambah Latihan</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Form;
