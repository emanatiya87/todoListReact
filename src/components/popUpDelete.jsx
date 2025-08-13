import React from "react";
import useTodoStore from "../store/todoStore";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
export default function PopUpDelete({ input }) {
  // from store
  const deletingTaskId = useTodoStore((state) => state.deletingTaskId);
  const setDeletingTaskId = useTodoStore((state) => state.setDeletingTaskId);
  const deleteTask = useTodoStore((state) => state.deleteTask);

  return (
    <>
      {" "}
      {/* pop up for confirm deleteing */}
      <Dialog
        open={deletingTaskId == input.id}
        onClose={() => setDeletingTaskId(null)}
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
          <Button onClick={() => setDeletingTaskId(null)}> Cancel</Button>
          <Button
            onClick={() => {
              deleteTask(input.id);
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
