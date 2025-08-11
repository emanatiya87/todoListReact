import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
// select priorty
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// date
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import useTodoStore from "../store/todoStore";
export default function PopUpEdit({ input, allTasks, setAllTasks }) {
  // from store
  const inputTasks = useTodoStore((state) => state.inputTasks);
  const setInputTasks = useTodoStore((state) => state.setInputTasks);
  const editingTaskId = useTodoStore((state) => state.editingTaskId);
  const setEditingTaskId = useTodoStore((state) => state.setEditingTaskId);

  // pop up edit
  const [inputUpdate, setInputUpdate] = useState({
    title: input.title,
    body: input.body,
    priorty: input.priorty,
    dueDate: input.dueDate,
  });
  const handleCloseEdit = () => {
    setEditingTaskId(null);
  };
  // update
  const handleSubmitUpdate = (e, i) => {
    e.preventDefault();
    const newTasks = allTasks.map((t) =>
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
    handleCloseEdit();
    setAllTasks(newTasks);
    setEditingTaskId(null);
  };
  return (
    <>
      {/* pop up for Edit */}
      <Dialog open={editingTaskId === input.id} onClose={handleCloseEdit}>
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
