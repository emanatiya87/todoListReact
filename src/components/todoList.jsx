import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Mission from "./mission";
import useTodoStore from "../store/todoStore";
import FormAdding from "./FormAdding";
import FilterationHeader from "./FilterationHeader";
export default function TodoList() {
  const inputTasks = useTodoStore((state) => state.inputTasks);
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
        <FilterationHeader></FilterationHeader>

        <Stack spacing={1} style={{ margin: "20px 0" }}>
          {tasks}
        </Stack>
        <FormAdding></FormAdding>
      </Container>
    </div>
  );
}
