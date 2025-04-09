import { useState, useRef, useEffect } from "react";
import { Task, Project } from "@customTypes/index";
import { loadProjects, saveProjects } from "@storage/storage";
import { showNotification } from "@components/NotifierManager";
import Texts from "@constants/texts";

const useTasksManager = (initialProject: Project) => {
  const tasksRef = useRef<Task[]>(initialProject.tasks);
  const [tasks, setTasks] = useState<Task[]>(initialProject.tasks);

  useEffect(() => {
    loadProjects().then((data) => {
      const current = data.find((p) => p.id === initialProject.id);
      if (current) {
        tasksRef.current = current.tasks;
        setTasks([...current.tasks]);
      }
    });
  }, [initialProject.id]);

  const saveUpdatedTasks = async (updatedTasks: Task[]) => {
    tasksRef.current = updatedTasks;
    setTasks([...updatedTasks]);
    const projects = await loadProjects();
    const updatedProjects = projects.map((p) =>
      p.id === initialProject.id ? { ...p, tasks: updatedTasks } : p
    );
    await saveProjects(updatedProjects);
  };

  const addTask = (title: string) => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return false;

    const isDuplicate = tasksRef.current.some(
      (task) => task.title.toLowerCase() === trimmedTitle.toLowerCase()
    );

    if (isDuplicate) {
      showNotification(Texts.errorTaskNameDuplicate, "error");
      return false;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: trimmedTitle,
      completed: false,
    };

    const updatedTasks = [...tasksRef.current, newTask];
    saveUpdatedTasks(updatedTasks);
    return true;
  };

  const removeTask = (id: string) => {
    const updatedTasks = tasksRef.current.filter((t) => t.id !== id);
    saveUpdatedTasks(updatedTasks);
  };

  const toggleTask = (id: string) => {
    const updatedTasks = tasksRef.current.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveUpdatedTasks(updatedTasks);
  };

  const updateTaskOrder = (updatedTasks: Task[]) => {
    tasksRef.current = updatedTasks;
    setTasks([...updatedTasks]);
  }; 

  const saveTasks = () => saveUpdatedTasks(tasksRef.current);

  return {
    tasks,
    setTasks,
    addTask,
    removeTask,
    toggleTask,
    updateTaskOrder,
    saveTasks,
  };
};

export default useTasksManager;
