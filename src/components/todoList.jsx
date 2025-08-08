import React, { use } from "react";
import Container from "@mui/material/Container";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Mission from "./mission";
import { useContext } from "react";
import { TaskContext } from "../context/tasksContext";
import { v4 as uuidv4 } from "uuid";
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
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { Chip } from "@mui/material";

export default function TodoList() {
  const { inputTasks, setInputTasks } = useContext(TaskContext);
  const [allTasks, setAllTasks] = useState(inputTasks);
  const [alignment, setAlignment] = useState("all");
  const [searchItem, setSearchItem] = useState("");
  let newtask = "";
  let newtaskDetails = "";
  let newDueDate = "";
  let newPriorty = "";
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };
  let priortyLevels = {
    High: 1,
    Medium: 2,
    Low: 3,
  };
  let tasks = inputTasks.map((t) => {
    return (
      <Mission
        input={t}
        key={t.id}
        allTasks={allTasks}
        setAllTasks={setAllTasks}
      />
    );
  });
  return (
    <div>
      <Container
        maxWidth="sm"
        style={{
          backgroundColor: "#efebe9",
          padding: "10px 20px 20px 20px ",
          borderRadius: "20px",
        }}
      >
        <h1>Todo List</h1>
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            let searchValues = allTasks.filter((t) => {
              return t.title
                .toLowerCase()
                .includes(searchItem.trim().toLowerCase());
            });
            setInputTasks(searchValues);
          }}
        >
          <Stack direction="row" spacing={1}>
            {" "}
            <TextField
              label="Search"
              variant="outlined"
              fullWidth
              value={searchItem}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                setSearchItem(e.target.value);
              }}
            />
            <Button variant="contained" size="small" type="submit">
              Search
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setSearchItem(" ");
                setInputTasks(allTasks);
              }}
            >
              Reset
            </Button>
          </Stack>
        </form>
        <Stack
          spacing={1}
          direction="row"
          style={{ margin: "20px 0" }}
          justifyContent="center"
          alignItems="center"
        >
          <h2>Priority:</h2>

          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              let filtered = [...allTasks].sort((a, b) => {
                return priortyLevels[a.priorty] - priortyLevels[b.priorty];
              });
              setInputTasks(filtered);
            }}
          >
            {" "}
            Sort By priorty
          </Button>
          <Chip
            label="Low"
            sx={{
              boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
              backgroundColor: "#D1FAE5",
              color: "#065F46",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={() => {
              let filtered = allTasks.filter((t) => {
                return t.priorty == "Low";
              });
              setInputTasks(filtered);
            }}
          />
          <Chip
            label="Medium"
            sx={{
              boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
              backgroundColor: "#FEF3C7",
              color: "#92400E",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={() => {
              let filtered = allTasks.filter((t) => {
                return t.priorty == "Medium";
              });
              setInputTasks(filtered);
            }}
          />
          <Chip
            label="High"
            sx={{
              boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
              backgroundColor: "#FECACA",
              color: "#991B1B",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={() => {
              let filtered = allTasks.filter((t) => {
                return t.priorty == "High";
              });
              setInputTasks(filtered);
            }}
          />
        </Stack>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          {" "}
          <ToggleButton
            value="all"
            onClick={() => {
              setInputTasks(allTasks);
            }}
          >
            ALL messions
          </ToggleButton>
          <ToggleButton
            value="done"
            onClick={() => {
              let filtered = allTasks.filter((t) => {
                return t.isComplete == true;
              });
              setInputTasks(filtered);
            }}
          >
            Done
          </ToggleButton>
          <ToggleButton
            value="waiting"
            onClick={() => {
              let filtered = allTasks.filter((t) => {
                return t.isComplete == false;
              });
              setInputTasks(filtered);
            }}
          >
            Waiting List
          </ToggleButton>
        </ToggleButtonGroup>
        <Stack spacing={1} style={{ margin: "20px 0" }}>
          {tasks}
        </Stack>
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
            localStorage.setItem("todos", JSON.stringify(updatedTasks));
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
      </Container>
    </div>
  );
}
