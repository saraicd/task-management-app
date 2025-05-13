import { useState } from "react";
import TaskTable, { TaskData } from "../common/TaskTable";
import { EditSidebar } from "./EditSideBar";
import { Heading } from "../common/Heading";
import { addTask, deleteTask, updateTask } from "../../services/api";
import { showSuccessToast, showWarningToast } from "../common/Toast";

export function Tasks() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [isTableChanged, setIsTableChanged] = useState(false);

  const handleEditTask = (taskId: number | undefined) => {
    if (!taskId) {
      setEditingTaskId(null);
      setIsSidebarOpen(true);
      return;
    }
    setEditingTaskId(taskId);
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    setEditingTaskId(null);
  };

  const handleSave = async (newTask: TaskData) => {
    const { task, error } = await addTask(newTask);

    handleCloseSidebar();
    if (error) {
      showWarningToast(error);
    } else if (task) {
      setIsTableChanged((prev) => !prev);
      showSuccessToast(`${task.task} added successfully!`);
    }
  };

  const handleUpdateTask = async (updatedTask: TaskData) => {
    const { task, error } = await updateTask(updatedTask);

    handleCloseSidebar();
    if (error) {
      showWarningToast(error);
    } else if (task) {
      setIsTableChanged((prev) => !prev);
      showSuccessToast(`Task "${task.task}" updated successfully!`);
    }
  };

  const handleDelete = async (taskId: number) => {
    const { success, error } = await deleteTask(taskId);

    handleCloseSidebar();
    if (!success) {
      showWarningToast(error ?? "");
    } else {
      setIsTableChanged((prev) => !prev);
      showSuccessToast(`Task deleted successfully!`);
    }
  };

  return (
    <main className="relative " role="main">
      <header className="pt-4 pb-0 text-left">
        <Heading level={3}>Task List</Heading>
      </header>
      <section>
        <TaskTable
          onEditTask={handleEditTask}
          isTableChanged={isTableChanged}
        />
      </section>
      <EditSidebar
        isOpen={isSidebarOpen}
        taskId={editingTaskId}
        onClose={handleCloseSidebar}
        onSave={handleSave}
        onUpdate={handleUpdateTask}
        onDelete={handleDelete}
      />
    </main>
  );
}
