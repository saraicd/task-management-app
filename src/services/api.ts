import { TaskData } from "../components/layout/TaskTable";

const API_BASE_URL = "https://68126393129f6313e20e6dfb.mockapi.io/api";

export type TaskApiResponseItem = {
  createdAt: string;
  task: string;
  due: string;
  owner: string;
  status: boolean;
  id: string;
};

export const fetchTasks = async (): Promise<TaskData[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const apiResponse: TaskApiResponseItem[] = await response.json();
    return apiResponse.map((item) => ({
      id: parseInt(item.id, 10),
      task: item.task || "No Title",
      due: item.due || "",
      owner: item.owner || "Unknown",
      status: item.status || false,
      progress: 0,
    }));
  } catch (error) {
    console.error("Error fetching and parsing tasks:", error);
    return [];
  }
};
