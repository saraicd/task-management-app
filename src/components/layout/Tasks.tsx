import { useState } from "react";
import TaskTable, { TaskData } from "../common/TaskTable";
import { EditSidebar } from "./EditSideBar";
import { Heading } from "../common/Heading";

export function Tasks() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

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

  // TODO: Remove simulating saving changes with a timeout
  const handleSaveChanges = (updatedTask: TaskData) => {
    console.log("Saving changes for task:", updatedTask);
    setTimeout(() => {
      handleCloseSidebar();
    }, 1000);
  };

  return (
    <main className="relative min-h-screen" role="main">
      <header className="pt-4 pb-0 text-left">
        <Heading level={3}>Task List</Heading>
      </header>
      <section>
        <TaskTable onEditTask={handleEditTask} />
      </section>
      <EditSidebar
        isOpen={isSidebarOpen}
        taskId={editingTaskId}
        onClose={handleCloseSidebar}
        onSave={handleSaveChanges}
      />
    </main>
  );
}
