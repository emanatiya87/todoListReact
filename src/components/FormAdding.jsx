// date
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// select priorty
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";
import useTodoStore from "../store/todoStore";

export default function FormAdding({ allTasks, setAllTasks }) {
  // from store
  const inputTasks = useTodoStore((state) => state.inputTasks);
  const setInputTasks = useTodoStore((state) => state.setInputTasks);

  let newtask = "";
  let newtaskDetails = "";
  let newDueDate = "";
  let newPriorty = "";
  return (
    <>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          let updatedTasks = [
            ...inputTasks,
            {
              id: uuidv4(),
              title: newtask,
              body: newtaskDetails,
              isComplete: false,
              dueDate: newDueDate,
              priorty: newPriorty,
            },
          ];
          setInputTasks(updatedTasks);
          setAllTasks(updatedTasks);
        }}
      >
        <Stack
          direction="row"
          style={{ justifyContent: "center" }}
          sx={{
            flexWrap: "wrap",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Add Mission"
            variant="outlined"
            onChange={(e) => {
              newtask = e.target.value;
            }}
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
            onChange={(e) => {
              newtaskDetails = e.target.value;
            }}
            inputProps={{
              maxLength: 500,
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                minDate={dayjs()}
                onChange={(e) => {
                  newDueDate = e.format("DD-MM-YYYY");
                  console.log(newDueDate);
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Priority</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                required
                onChange={(e) => {
                  newPriorty = e.target.value;
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
