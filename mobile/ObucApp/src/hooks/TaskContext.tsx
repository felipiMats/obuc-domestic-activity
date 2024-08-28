import { TaskContext } from "@contexts/TaskContext";
import { useContext } from "react";

export function useTask() {
  const context = useContext(TaskContext);

  return context;
}