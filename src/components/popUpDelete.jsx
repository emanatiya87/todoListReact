import React from "react";
import useTodoStore from "../store/todoStore";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
export default function PopUpDelete({ input, allTasks, setAllTasks }) {
  // from store
  const inputTasks = useTodoStore((state) => state.inputTasks);
  const setInputTasks = useTodoStore((state) => state.setInputTasks);
  const openDelete = useTodoStore((state) => state.openDelete);
  const setOpenDelete = useTodoStore((state) => state.setOpenDelete);
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  //confirm delete
  function handleDelete(i) {
    const newTasks = allTasks.filter((t) => {
      return t.id != i;
    });
    setInputTasks(newTasks);
    setAllTasks(newTasks);
    setOpenDelete(false);
  }
  return (
    <>
      {" "}
      {/* pop up for confirm deleteing */}
      <Dialog
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Deleting Task!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure you want to delete this task ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}> Cancel</Button>
          <Button
            onClick={() => {
              handleDelete(input.id);
            }}
            autoFocus
          >
            Yes Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
