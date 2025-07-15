import React from "react";
import { useState, useContext } from "react";
import { TaskContext } from "../context/tasksContext";
import Stack from "@mui/material/Stack";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export default function Mission({ input }) {
  // pop up deleting
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // pop up edit
  const [inputUpdtae, setInputUpdate] = useState({
    title: input.title,
    body: input.body,
  });
  const [edit, setEdit] = useState(false);
  const handleClickOpenEdit = () => {
    setEdit(true);
  };
  const handleCloseEdit = () => {
    setEdit(false);
  };
  const handleSubmitUpdate = (e, i) => {
    e.preventDefault();
    const newTasks = inputTasks.map((t) =>
      t.id === i
        ? { ...t, title: inputUpdtae.title, body: inputUpdtae.body }
        : t
    );
    setInputTasks(newTasks);
    localStorage.setItem("todos", JSON.stringify(newTasks));
    handleCloseEdit();
  };
  const { inputTasks, setInputTasks } = useContext(TaskContext);
  // done
  function handleComplete(i) {
    const newTasks = inputTasks.map((t) =>
      t.id === i ? { ...t, isComplete: !t.isComplete } : t
    );
    setInputTasks(newTasks);
    localStorage.setItem("todos", JSON.stringify(newTasks));
  }
  // delete
  function handleDelete(i) {
    const newTasks = inputTasks.filter((t) => {
      return t.id != i;
    });
    setInputTasks(newTasks);
    localStorage.setItem("todos", JSON.stringify(newTasks));
  }

  return (
    <>
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
          </h3>
          <p
            style={{
              textDecoration:
                input.isComplete === false ? "none" : "line-through",
            }}
          >
            {input.body}
          </p>
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
              handleClickOpenEdit();
            }}
          />
          <DeleteIcon
            style={{
              color: "#c62828",
              fontSize: "2rem",
              padding: "0 1rem",
              cursor: "pointer",
            }}
            onClick={handleClickOpen}
          ></DeleteIcon>
        </div>
      </Stack>
      {/* pop up for confirm deleteing */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Deleting Task!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure you want to delete this task ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}> Cancel</Button>
          <Button
            onClick={() => {
              handleDelete(input.id);
            }}
            autoFocus
          >
            Yes Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* pop up for Edit */}
      <Dialog open={edit} onClose={handleCloseEdit}>
        <DialogTitle>Edit </DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <form
            onSubmit={(e) => {
              handleSubmitUpdate(e, input.id);
            }}
          >
            <TextField
              autoFocus
              required
              margin="dense"
              name="title"
              label="title"
              type="text"
              fullWidth
              variant="standard"
              value={inputUpdtae.title}
              onChange={(e) => {
                setInputUpdate({ ...inputUpdtae, title: e.target.value });
              }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              name="details"
              label="Details"
              type="text"
              fullWidth
              variant="standard"
              value={inputUpdtae.body}
              onChange={(e) => {
                setInputUpdate({ ...inputUpdtae, body: e.target.value });
              }}
            />
            <DialogActions>
              <Button onClick={handleCloseEdit}>Cancel</Button>
              <Button type="submit">Save Edits</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
