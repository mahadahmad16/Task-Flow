import { useEffect, useState } from "react";
import type { Task } from "../types/task";
import type { Filter, SortOption } from "../types/filters";

function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("taskflow_tasks");

    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);

        return parsedTasks.map((task: Task) => ({
          ...task,
          dueDate: task.dueDate || "",
          priority: task.priority || "medium",
        }));
      } catch {
        return [];
      }
    }

    return [];
  });

  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] =
    useState<SortOption>("newest");

  useEffect(() => {
    localStorage.setItem(
      "taskflow_tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  const addTask = (task: Task) => {
    setTasks((previousTasks) => [...previousTasks, task]);
  };

  const toggleTask = (id: number) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );
  };

  const editTask = (
    id: number,
    title: string,
    description: string,
    dueDate: string,
    priority: Task["priority"]
  ) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title,
              description,
              dueDate,
              priority,
            }
          : task
      )
    );
  };

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.filter(
    (task) => !task.completed
  ).length;

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === "all"
        ? true
        : filter === "pending"
        ? !task.completed
        : task.completed;

    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      task.title.toLowerCase().includes(searchText) ||
      task.description.toLowerCase().includes(searchText) ||
      task.priority.toLowerCase().includes(searchText);

    return matchesFilter && matchesSearch;
  });

  const sortedTasks = [...filteredTasks].sort(
    (a, b) => {
      if (sortBy === "newest") {
        return b.id - a.id;
      }

      if (sortBy === "oldest") {
        return a.id - b.id;
      }

      if (sortBy === "priority") {
        const priorityValue = {
          high: 3,
          medium: 2,
          low: 1,
        };

        return (
          priorityValue[b.priority] -
          priorityValue[a.priority]
        );
      }

      if (sortBy === "dueDate") {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;

        return (
          new Date(a.dueDate).getTime() -
          new Date(b.dueDate).getTime()
        );
      }

      return 0;
    }
  );

  return {
    tasks,
    sortedTasks,
    totalTasks,
    pendingTasks,
    completedTasks,
    search,
    setSearch,
    filter,
    setFilter,
    sortBy,
    setSortBy,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
  };
}

export default useTasks;