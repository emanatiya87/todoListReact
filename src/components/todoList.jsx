import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import Mission from "./mission";
import useTodoStore from "../store/todoStore";
import FormAdding from "./FormAdding";
import FilterationHeader from "./FilterationHeader";
export default function TodoList() {
  const inputTasks = useTodoStore((state) => state.inputTasks);
  const [allTasks, setAllTasks] = useState(inputTasks);
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
        <FilterationHeader
          allTasks={allTasks}
          setAllTasks={setAllTasks}
        ></FilterationHeader>

        <Stack spacing={1} style={{ margin: "20px 0" }}>
          {tasks}
        </Stack>
        <FormAdding allTasks={allTasks} setAllTasks={setAllTasks}></FormAdding>
      </Container>
    </div>
  );
}
