import { useForm, Controller } from "react-hook-form";

import useTodoStore from "../store/todoStore";

// MUI
import {
  FormControl,
  MenuItem,
  Select,
  TextField,
  InputLabel,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
// date
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function PopUpEdit({ input }) {
  // from store
  const setInputTasks = useTodoStore((state) => state.setInputTasks);
  const editingTaskId = useTodoStore((state) => state.editingTaskId);
  const setEditingTaskId = useTodoStore((state) => state.setEditingTaskId);
  const { allTasks, setAllTasks } = useTodoStore();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: input.title,
      body: input.body,
      dueDate: input.dueDate,
      priorty: input.priorty,
    },
  });
  const submit = (data) => {
    const newTasks = allTasks.map((t) =>
      t.id === input.id ? { ...t, ...data } : t
    );
    setInputTasks(newTasks);
    setAllTasks(newTasks);
    setEditingTaskId(null);
    reset();
  };
  return (
    <>
      {/* pop up for Edit */}
      <Dialog
        open={editingTaskId === input.id}
        onClose={() => setEditingTaskId(null)}
      >
        <DialogTitle>Edit </DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <form onSubmit={handleSubmit(submit)}>
            <TextField
              autoFocus
              margin="dense"
              name="title"
              label="title"
              type="text"
              fullWidth
              variant="standard"
              {...register("title", {
                minLength: {
                  value: 2,
                  message: "Title must be at least 2 characters",
                },
                maxLength: {
                  value: 100,
                  message: "Title cannot exceed 100 characters",
                },
              })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <TextField
              autoFocus
              margin="dense"
              name="details"
              label="Details"
              type="text"
              fullWidth
              variant="standard"
              {...register("body", {
                maxLength: {
                  value: 500,
                  message: "Title cannot exceed 500 characters",
                },
              })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            {/* Priority */}
            <FormControl fullWidth margin="dense">
              <InputLabel id="priority-label">Priority</InputLabel>
              <Controller
                name="priorty"
                control={control}
                render={({ field }) => (
                  <Select {...field} labelId="priority-label">
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
            {/* Due Date */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <Controller
                  name="dueDate"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      minDate={dayjs()}
                      value={
                        field.value ? dayjs(field.value, "DD-MM-YYYY") : null
                      }
                      onChange={(date) =>
                        field.onChange(date ? date.format("DD-MM-YYYY") : "")
                      }
                    />
                  )}
                />
              </DemoContainer>
            </LocalizationProvider>

            <DialogActions>
              <Button onClick={() => setEditingTaskId(null)}>Cancel</Button>
              <Button type="submit">Save Edits</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
