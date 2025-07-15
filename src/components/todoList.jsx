import React from "react";
import Container from "@mui/material/Container";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Mission from "./mission";
import { useContext } from "react";
import { TaskContext } from "../context/tasksContext";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  const { inputTasks, setInputTasks } = useContext(TaskContext);
  const [alignment, setAlignment] = useState("all");
  let newtask = "";
  let newtaskDetails = "";
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };
  let tasks = inputTasks.map((t) => {
    return <Mission input={t} key={t.id} />;
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
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          {" "}
          <ToggleButton value="all">ALL messions</ToggleButton>
          <ToggleButton value="done">Done</ToggleButton>
          <ToggleButton value="waiting">Waiting List</ToggleButton>
        </ToggleButtonGroup>
        <Stack spacing={1} style={{ margin: "20px 0" }}>
          {tasks}
        </Stack>
        <Stack direction="row" style={{ justifyContent: "center" }}>
          <TextField
            id="outlined-basic"
            label="Add Mission"
            variant="outlined"
            onChange={(e) => {
              newtask = e.target.value;
            }}
          />
          <TextField
            id="outlined-basic"
            label="Add Mission Details"
            variant="outlined"
            onChange={(e) => {
              newtaskDetails = e.target.value;
            }}
          />

          <Button
            variant="contained"
            size="small"
            onClick={() => {
              let updatedTasks = [
                ...inputTasks,
                {
                  id: uuidv4(),
                  title: newtask,
                  body: newtaskDetails,
                  isComplete: false,
                },
              ];
              setInputTasks(updatedTasks);
              localStorage.setItem("todos", JSON.stringify(updatedTasks));
            }}
          >
            ADD
          </Button>
        </Stack>
      </Container>
    </div>
  );
}
