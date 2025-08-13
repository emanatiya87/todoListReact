// store/todoStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

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

      // delete task
      deleteTask: (id) =>
        set((state) => {
          const newTasks = state.allTasks.filter((t) => t.id !== id);
          return {
            inputTasks: newTasks,
            allTasks: newTasks,
            deletingTaskId: null,
          };
        }),

      // mark as completed
      completeTask: (id) =>
        set((state) => {
          const updatedTasks = state.allTasks.map((t) =>
            t.id === id ? { ...t, isComplete: !t.isComplete } : t
          );
          return {
            allTasks: updatedTasks,
          };
        }),

      // add task
      addTask: (title, body, dueDate, priorty) =>
        set((state) => {
          const newTask = {
            id: uuidv4(),
            title,
            body,
            isComplete: false,
            dueDate,
            priorty,
          };
          const updatedTasks = [...state.inputTasks, newTask];
          return {
            inputTasks: updatedTasks,
            allTasks: updatedTasks,
          };
        }),
    }),
    {
      name: "todo-storage", // key in storage
      partialize: (state) => ({ allTasks: state.allTasks }), // only persist allTasks
    }
  )
);

export default useTodoStore;
