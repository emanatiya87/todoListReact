import "./App.css";
import TodoList from "./components/todoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
function App() {
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
        <TodoList />
      </ThemeProvider>
    </div>
  );
}

export default App;
