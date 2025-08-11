import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import ChipPriority from "./chipPriority";
import useTodoStore from "../store/todoStore";
import { useState } from "react";

export default function FilterationHeader({ allTasks, setAllTasks }) {
  const [alignment, setAlignment] = useState("all");
  const [searchItem, setSearchItem] = useState("");
  const inputTasks = useTodoStore((state) => state.inputTasks);
  const setInputTasks = useTodoStore((state) => state.setInputTasks);

  let priortyLevels = {
    High: 1,
    Medium: 2,
    Low: 3,
  };

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };
  return (
    <>
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
        <ChipPriority
          label="Low"
          filter={() => {
            let filtered = allTasks.filter((t) => {
              return t.priorty === "Low";
            });
            setInputTasks(filtered);
          }}
        ></ChipPriority>
        <ChipPriority
          label="Medium"
          filter={() => {
            let filtered = allTasks.filter((t) => {
              return t.priorty === "Medium";
            });
            setInputTasks(filtered);
          }}
        ></ChipPriority>
        <ChipPriority
          label="High"
          filter={() => {
            let filtered = allTasks.filter((t) => {
              return t.priorty === "High";
            });
            setInputTasks(filtered);
          }}
        ></ChipPriority>
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
              return t.isComplete === true;
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
              return t.isComplete === false;
            });
            setInputTasks(filtered);
          }}
        >
          Waiting List
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}
