import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ChipPriority from "./chipPriority";
import useTodoStore from "../store/todoStore";
import { useState, useEffect } from "react";

export default function FilterationHeader() {
  const [alignment, setAlignment] = useState("all");
  const [searchItem, setSearchItem] = useState("");

  const allTasks = useTodoStore((state) => state.allTasks);
  const setInputTasks = useTodoStore((state) => state.setInputTasks);

  const priortyLevels = { High: 1, Medium: 2, Low: 3 };

  // Show all tasks initially
  useEffect(() => {
    setInputTasks(allTasks);
  }, [allTasks, setInputTasks]);

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <>
      {/* Search */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          let searchValues = allTasks.filter((t) =>
            t.title.toLowerCase().includes(searchItem.trim().toLowerCase())
          );
          setInputTasks(searchValues);
        }}
      >
        <Stack direction="row" spacing={1}>
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
            onChange={(e) => setSearchItem(e.target.value)}
          />
          <Button variant="contained" size="small" type="submit">
            Search
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              setSearchItem("");
              setInputTasks(allTasks);
              setAlignment("all");
            }}
          >
            Reset
          </Button>
        </Stack>
      </form>

      {/* Priority */}
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
            let sorted = [...allTasks].sort(
              (a, b) => priortyLevels[a.priorty] - priortyLevels[b.priorty]
            );
            setInputTasks(sorted);
          }}
        >
          Sort By Priority
        </Button>
        {["Low", "Medium", "High"].map((level) => (
          <ChipPriority
            key={level}
            label={level}
            filter={() => {
              let filtered = allTasks.filter((t) => t.priorty === level);
              setInputTasks(filtered);
            }}
          />
        ))}
      </Stack>

      {/* Toggle buttons */}
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value="all" onClick={() => setInputTasks(allTasks)}>
          ALL missions
        </ToggleButton>
        <ToggleButton
          value="done"
          onClick={() =>
            setInputTasks(allTasks.filter((t) => t.isComplete === true))
          }
        >
          Done
        </ToggleButton>
        <ToggleButton
          value="waiting"
          onClick={() =>
            setInputTasks(allTasks.filter((t) => t.isComplete === false))
          }
        >
          Waiting List
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}
