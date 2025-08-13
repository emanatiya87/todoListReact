import { useForm } from "react-hook-form";

// date
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// select priorty
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  TextField,
  InputLabel,
  Stack,
  Button,
} from "@mui/material";
import useTodoStore from "../store/todoStore";

export default function FormAdding() {
  // from store
  const addTask = useTodoStore((state) => state.addTask);
  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      title: "",
      body: "",
      dueDate: "",
      priorty: "",
    },
  });
  const submit = (data) => {
    addTask(data.title, data.body, data.dueDate, data.priorty);
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <Stack
          direction="row"
          style={{ justifyContent: "center" }}
          sx={{
            flexWrap: "wrap",
          }}
          spacing={1}
        >
          <TextField
            id="outlined-basic"
            label="Add Mission"
            variant="outlined"
            {...register("title")}
            inputProps={{
              minLength: 1,
              maxLength: 100,
            }}
            required
          />
          <TextField
            id="outlined-basic"
            label="Add Mission Details"
            variant="outlined"
            {...register("body")}
            inputProps={{
              maxLength: 500,
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                minDate={dayjs()}
                onChange={(date) =>
                  setValue("dueDate", date.format("DD-MM-YYYY"))
                }
              />
            </DemoContainer>
          </LocalizationProvider>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="priority-label">Priority</InputLabel>
              <Select
                labelId="priority-label"
                id="priority"
                {...register("priorty")}
                required
                onChange={(e) => {
                  setValue("priorty", e.target.value);
                  register("priorty").onChange(e);
                }}
              >
                <MenuItem value={"Low"}>Low</MenuItem>
                <MenuItem value={"Medium"}>Medium</MenuItem>
                <MenuItem value={"High"}>High</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button variant="contained" size="small" type="submit">
            ADD
          </Button>
        </Stack>
      </form>
    </>
  );
}
