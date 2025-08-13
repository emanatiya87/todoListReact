import Stack from "@mui/material/Stack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import PopUpEdit from "./popUpEdit";
import PopUpDelete from "./popUpDelete";
import useTodoStore from "../store/todoStore";
import ChipPriority from "./chipPriority";

export default function Mission({ input }) {
  const { allTasks, setAllTasks, setDeletingTaskId, setEditingTaskId } =
    useTodoStore();

  function handleComplete(id) {
    const updatedTasks = allTasks.map((t) =>
      t.id === id ? { ...t, isComplete: !t.isComplete } : t
    );
    setAllTasks(updatedTasks);
  }

  return (
    <>
      <PopUpEdit input={input} />
      <PopUpDelete input={input} />

      <Stack
        direction="row"
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          borderRadius: "40px",
          boxShadow: "0 0 4px black",
          backgroundColor: input.isComplete ? "#ccc" : "transparent",
        }}
      >
        <div>
          <h3
            style={{
              textDecoration: input.isComplete ? "line-through" : "none",
            }}
          >
            {input.title}
            <ChipPriority label={input.priorty} />
          </h3>
          <p
            style={{
              textDecoration: input.isComplete ? "line-through" : "none",
            }}
          >
            {input.body}
          </p>
          <p>dueDate: {input.dueDate || "Not determined yet"}</p>
        </div>

        <div>
          <CheckCircleOutlineIcon
            style={{
              color: "teal",
              fontSize: "2rem",
              padding: "0 1rem",
              cursor: "pointer",
            }}
            onClick={() => handleComplete(input.id)}
          />
          <EditSquareIcon
            style={{
              color: "#3949ab",
              fontSize: "2rem",
              padding: "0 1rem",
              cursor: "pointer",
            }}
            onClick={() => setEditingTaskId(input.id)}
          />
          <DeleteIcon
            style={{
              color: "#c62828",
              fontSize: "2rem",
              padding: "0 1rem",
              cursor: "pointer",
            }}
            onClick={() => setDeletingTaskId(input.id)}
          />
        </div>
      </Stack>
    </>
  );
}
