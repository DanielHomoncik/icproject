export type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export type Project = {
  id: string;
  name: string;
  tasks: Task[];
};
export type RootStackParamList = {
  ProjectList: { project: Project };
  Tasks: { project: Project };
};
