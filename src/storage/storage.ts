import AsyncStorage from "@react-native-async-storage/async-storage";
import { Project } from "../types";

const STORAGE_KEY = "@projects";

export const saveProjects = async (projects: Project[]) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch (error) {
    console.error("Error saving projects:", error);
  }
};

export const loadProjects = async (): Promise<Project[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading projects:", error);
    return [];
  }
};
