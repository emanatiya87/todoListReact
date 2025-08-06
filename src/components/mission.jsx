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
import { Chip } from "@mui/material";
// select priorty
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
// date
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
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
  const [inputUpdate, setInputUpdate] = useState({
    title: input.title,
    body: input.body,
    priorty: input.priorty,
    dueDate: input.dueDate,
  });
  const [edit, setEdit] = useState(false);
  const handleClickOpenEdit = () => {
    setEdit(true);
  };
  const handleCloseEdit = () => {
    setEdit(false);
  };
  // update
  const handleSubmitUpdate = (e, i) => {
    e.preventDefault();
    const newTasks = inputTasks.map((t) =>
      t.id === i
        ? {
            ...t,
            title: inputUpdate.title,
            body: inputUpdate.body,
            priorty: inputUpdate.priorty,
            dueDate: inputUpdate.dueDate,
          }
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
  // priorty
  function handelPriortyBg(priorty) {
    if (priorty === "High") {
      return "#FECACA";
    } else if (priorty === "Medium") {
      return "#FEF3C7";
    } else if (priorty === "Low") {
      return "#D1FAE5";
    }
  }
  function handelPriortyTextColor(priorty) {
    if (priorty === "High") {
      return "#991B1B";
    } else if (priorty === "Medium") {
      return "#92400E";
    } else if (priorty === "Low") {
      return "#065F46";
    }
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
            <Chip
              label={input.priorty}
              sx={{
                boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                backgroundColor: handelPriortyBg(input.priorty),
                color: handelPriortyTextColor(input.priorty),
                fontWeight: "bold",
                cursor: "pointer",
                marginLeft: "10px",
              }}
            />
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
              margin="dense"
              name="title"
              label="title"
              type="text"
              fullWidth
              variant="standard"
              value={inputUpdate.title}
              onChange={(e) => {
                setInputUpdate({ ...inputUpdate, title: e.target.value });
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              name="details"
              label="Details"
              type="text"
              fullWidth
              variant="standard"
              value={inputUpdate.body}
              onChange={(e) => {
                setInputUpdate({ ...inputUpdate, body: e.target.value });
              }}
            />

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Priority</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                onChange={(e) => {
                  setInputUpdate({ ...inputUpdate, priorty: e.target.value });
                }}
              >
                <MenuItem value={"Low"}>Low</MenuItem>
                <MenuItem value={"Medium"}>Medium</MenuItem>
                <MenuItem value={"High"}>High</MenuItem>
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  minDate={dayjs()}
                  onChange={(e) => {
                    setInputUpdate({
                      ...inputUpdate,
                      dueDate: e ? e.format("DD-MM-YYYY") : "",
                    });
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
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
