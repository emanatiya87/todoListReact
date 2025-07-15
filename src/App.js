import "./App.css";
import TodoList from "./components/todoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { v4 as uuidv4 } from "uuid";
import { TaskContext } from "./context/tasksContext.js";
import { useState } from "react";
function App() {
  let storageTodos = JSON.parse(localStorage.getItem("todos")) || [];
  const [inputTasks, setInputTasks] = useState(storageTodos);
  const theme = createTheme({
    palette: {
      primary: {
        main: "#4e342e",
      },
      secondary: {
        main: "#f44336",
      },
    },
  });
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <TaskContext.Provider
          value={{
            inputTasks,
            setInputTasks,
          }}
        >
          <TodoList />
        </TaskContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
