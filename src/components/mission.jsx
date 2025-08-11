import Stack from "@mui/material/Stack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import PopUpEdit from "./popUpEdit";
import PopUpDelete from "./popUpDelete";
import useTodoStore from "../store/todoStore";
import ChipPriority from "./chipPriority";
export default function Mission({ input, allTasks, setAllTasks }) {
  // pop up deleting
  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };
  const setEditingTaskId = useTodoStore((state) => state.setEditingTaskId);

  const handleClickOpenEdit = (id) => {
    setEditingTaskId(id);
  };
  // from store
  const inputTasks = useTodoStore((state) => state.inputTasks);
  const setInputTasks = useTodoStore((state) => state.setInputTasks);
  const openDelete = useTodoStore((state) => state.openDelete);
  const setOpenDelete = useTodoStore((state) => state.setOpenDelete);
  // done
  function handleComplete(i) {
    const newTasks = allTasks.map((t) =>
      t.id === i ? { ...t, isComplete: !t.isComplete } : t
    );
    setInputTasks(newTasks);
    setAllTasks(newTasks);
  }

  return (
    <>
      <PopUpEdit
        input={input}
        allTasks={allTasks}
        setAllTasks={setAllTasks}
      ></PopUpEdit>
      <PopUpDelete
        input={input}
        allTasks={allTasks}
        setAllTasks={setAllTasks}
      ></PopUpDelete>
      <Stack
        direction="row"
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          borderRadius: "40px",
          boxShadow: "0 0 4px black",
          backgroundColor: input.isComplete === false ? "transparent" : "#ccc",
        }}
      >
        <div>
          <h3
            style={{
              textDecoration:
                input.isComplete === false ? "none" : "line-through",
            }}
          >
            {input.title}
            <ChipPriority label={input.priorty}></ChipPriority>
          </h3>
          <p
            style={{
              textDecoration:
                input.isComplete === false ? "none" : "line-through",
            }}
          >
            {input.body}
          </p>
          <p>dueDate: {input.dueDate || "Not detremind yet"}</p>
        </div>
        <div>
          <CheckCircleOutlineIcon
            style={{
              color: "teal",
              fontSize: "2rem",
              padding: "0 1rem",
              cursor: "pointer",
            }}
            onClick={() => {
              handleComplete(input.id);
            }}
          />
          <EditSquareIcon
            style={{
              color: "#3949ab",
              fontSize: "2rem",
              padding: "0 1rem",
              cursor: "pointer",
            }}
            onClick={() => {
              handleClickOpenEdit(input.id);
            }}
          />
          <DeleteIcon
            style={{
              color: "#c62828",
              fontSize: "2rem",
              padding: "0 1rem",
              cursor: "pointer",
            }}
            onClick={handleClickOpenDelete}
          ></DeleteIcon>
        </div>
      </Stack>
    </>
  );
}
