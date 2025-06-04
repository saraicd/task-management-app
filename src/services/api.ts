import { TaskData } from "../components/common/TaskTable";

const API_BASE_URL = "https://68400f695b39a8039a56a6a5.mockapi.io/task-m-api";

export type TaskApiResponseItem = {
  createdAt: string;
  task: string;
  due: string;
  owner: string;
  status: boolean;
  id: string;
  progress?: number;
};

export const fetchTasks = async (): Promise<TaskData[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/task`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const apiResponse: TaskApiResponseItem[] = await response.json();
    return apiResponse.map((item) => ({
      id: parseInt(item.id, 10),
      task: item.task || "No Title",
      due: new Date(item.due),
      owner: item.owner || "Unknown",
      status: item.status || false,
      progress: item.progress ?? 0,
    }));
  } catch (error) {
    console.error("Error fetching and parsing tasks:", error);
    return [];
  }
};

export const fetchTaskById = async (id: number): Promise<TaskData | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/task/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Task with ID ${id} not found (404).`);
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const apiResponseItem: TaskApiResponseItem = await response.json();

    if (!apiResponseItem) {
      console.warn(`API returned ok status but no data for task ID ${id}.`);
      return null;
    }

    const taskData: TaskData = {
      id: parseInt(apiResponseItem.id, 10),
      task: apiResponseItem.task || "No Title",
      due: new Date(apiResponseItem.due),
      owner: apiResponseItem.owner || "Unknown",
      status: apiResponseItem.status || false,
      progress: apiResponseItem.progress ?? 0,
    };

    return taskData;
  } catch (error) {
    console.error(`Error fetching task with ID ${id}:`, error);
    return null;
  }
};

export const addTask = async (
  task: TaskData
): Promise<{ task: TaskData | null; error: string | null }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        task: null,
        error: `Failed to add task. ${errorText}`,
      };
    }

    const apiResponseItem: TaskApiResponseItem = await response.json();

    const newTaskData: TaskData = {
      id: parseInt(apiResponseItem.id, 10),
      task: apiResponseItem.task || "No Title",
      due: new Date(apiResponseItem.due),
      owner: apiResponseItem.owner || "Unknown",
      status: apiResponseItem.status || false,
      progress: apiResponseItem.progress ?? 0,
    };

    return { task: newTaskData, error: null };
  } catch (error: any) {
    return {
      task: null,
      error: error.message || "Unknown error occurred while adding task.",
    };
  }
};

export const updateTask = async (
  task: TaskData
): Promise<{ task: TaskData | null; error: string | null }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/task/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        task: null,
        error: `Failed to update task. ${errorText}`,
      };
    }

    const apiResponseItem: TaskApiResponseItem = await response.json();

    const updatedTaskData: TaskData = {
      id: parseInt(apiResponseItem.id, 10),
      task: apiResponseItem.task || "No Title",
      due: new Date(apiResponseItem.due),
      owner: apiResponseItem.owner || "Unknown",
      status: apiResponseItem.status || false,
      progress: apiResponseItem.progress ?? 0,
    };

    return { task: updatedTaskData, error: null };
  } catch (error: any) {
    return {
      task: null,
      error: error.message || "Unknown error occurred while updating task.",
    };
  }
};

export const deleteTask = async (
  taskId: number
): Promise<{ success: boolean; error: string | null }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/task/${taskId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      return {
        success: false,
        error: "Failed to delete task.",
      };
    }

    return { success: true, error: null };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Unknown error occurred while deleting task.",
    };
  }
};
