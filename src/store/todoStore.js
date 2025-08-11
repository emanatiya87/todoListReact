import { create } from "zustand";

const useTodoStore = create((set) => ({
  inputTasks: JSON.parse(localStorage.getItem("todos")) || [],
  setInputTasks: (tasks) => {
    set({ inputTasks: tasks });
    localStorage.setItem("todos", JSON.stringify(tasks));
  },
  openDelete: false,
  setOpenDelete: (del) => {
    set({ openDelete: del });
  },
  editingTaskId: null,
  setEditingTaskId: (id) => set({ editingTaskId: id }),
}));

export default useTodoStore;
