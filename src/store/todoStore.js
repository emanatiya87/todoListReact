// store/todoStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useTodoStore = create(
  persist(
    (set) => ({
      allTasks: [], // persistent full list
      setAllTasks: (tasks) => set({ allTasks: tasks }),

      inputTasks: [], // transient filtered list
      setInputTasks: (tasks) => set({ inputTasks: tasks }),

      deletingTaskId: null,
      setDeletingTaskId: (del) => set({ deletingTaskId: del }),

      editingTaskId: null,
      setEditingTaskId: (id) => set({ editingTaskId: id }),
    }),
    {
      name: "todo-storage", // key in storage
      partialize: (state) => ({ allTasks: state.allTasks }), // only persist allTasks
    }
  )
);

export default useTodoStore;
