import { useState } from "react";
import TaskTable, { TaskData } from "../common/TaskTable";
import { EditSidebar } from "./EditSideBar";
import { Heading } from "../common/Heading";
import { toast } from "sonner";
import { CheckCircle, CircleAlert } from "lucide-react";
import { addTask, updateTask } from "../../services/api";

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

  const handleSaveChanges = async (newTask: TaskData) => {
    const { task, error } = await addTask(newTask);

    handleCloseSidebar();
    if (error) {
      toast.warning(error, {
        duration: 3000,
        style: {
          backgroundColor: "var(--color-black)",
          color: "var(--color-error)",
          borderColor: "var(--color-error)",
          fontSize: "11px",
          fontFamily: "var(--font-family)",
        },
        icon: <CircleAlert className="w-4 h-4" />,
      });
    } else if (task) {
      setIsTableChanged((prev) => !prev);
      toast.success(`${task.task} added successfully!`, {
        duration: 3000,
        style: {
          backgroundColor: "var(--color-black)",
          color: "var(--color-brand)",
          borderColor: "var(--color-brand)",
          fontSize: "11px",
          fontFamily: "var(--font-family)",
        },
        icon: <CheckCircle className="w-4 h-4" />,
      });
    }
  };

  const handleUpdateTask = async (updatedTask: TaskData) => {
    const { task, error } = await updateTask(updatedTask);

    handleCloseSidebar();
    if (error) {
      toast.warning(error, {
        duration: 3000,
        style: {
          backgroundColor: "var(--color-black)",
          color: "var(--color-error)",
          borderColor: "var(--color-error)",
          fontSize: "11px",
          fontFamily: "var(--font-family)",
        },
        icon: <CircleAlert className="w-4 h-4" />,
      });
    } else if (task) {
      setIsTableChanged((prev) => !prev);
      toast.success(`Task "${task.task}" updated successfully!`, {
        duration: 3000,
        style: {
          backgroundColor: "var(--color-black)",
          color: "var(--color-brand)",
          borderColor: "var(--color-brand)",
          fontSize: "11px",
          fontFamily: "var(--font-family)",
        },
        icon: <CheckCircle className="w-4 h-4" />,
      });
    }
  };

  return (
    <main className="relative min-h-screen" role="main">
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
        onSave={handleSaveChanges}
        onUpdate={handleUpdateTask}
      />
    </main>
  );
}
