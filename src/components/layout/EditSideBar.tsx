import React, { useState, useEffect, useRef } from "react";
import { CircleX } from "lucide-react";
import { TaskData } from "../common/TaskTable";
import { fetchTaskById } from "../../services/api";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Heading } from "../common/Heading";
import Skeleton from "react-loading-skeleton";
import { formatToDDMMYYYY, formatToYYYYMMDD } from "../../utils/date";

interface EditSidebarProps {
  isOpen: boolean;
  taskId: number | null;
  onClose: () => void;
  onSave: (updatedTask: TaskData) => void;
}

export function EditSidebar({
  isOpen,
  taskId,
  onClose,
  onSave,
}: EditSidebarProps) {
  const [taskData, setTaskData] = useState<TaskData | null>(null);
  const [editingMode, setEditingMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [progress, setProgress] = useState([55]);
  const minDate = new Date().toISOString().split("T")[0];
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && taskId !== null) {
      setEditingMode(true);
      setIsSaving(false);
      setIsLoading(true);
      setError(null);
      setTaskData(null);
      fetchTaskById(taskId)
        .then((data) => {
          if (data) {
            setTaskData(data);
          } else {
            setError("Task not found.");
          }
        })
        .catch((err) => {
          console.error("Error fetching task:", err);
          setError("Failed to load task data.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setEditingMode(false);
      setIsSaving(false);
      setTaskData(null);
      setError(null);
    }
  }, [isOpen, taskId]);

  useEffect(() => {
    if (isOpen) {
      sidebarRef.current?.focus();
    }
  }, [isOpen]);

  const handleStandardInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = event.target;

    setTaskData((prevData) => {
      if (!prevData) return null;
      let valueToStore = value;
      if (name === "due" && type === "date") {
        valueToStore = formatToDDMMYYYY(value);
      }

      return { ...prevData, [name]: valueToStore };
    });
  };

  const handleDelete = () => {
    if (taskId !== null) {
      //TODO: Implement delete functionality
    }
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setFormErrors([]); // TODO: Validate fields and set errors if any
    setIsSaving(true);
    if (taskData) {
      onSave(taskData);
    } else setIsSaving(false);
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-primary bg-opacity-20 z-40 transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-70" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      ></div>
      <aside
        ref={sidebarRef}
        tabIndex={-1}
        role="dialog"
        aria-labelledby="edit-sidebar-heading"
        aria-hidden={!isOpen}
        className={`edit-side-bar fixed top-0 right-0 h-full w-80 md:w-96 bg-white shadow-lg p-6 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <Heading level={3}>
            <div className="capitalize">
              {editingMode ? taskData?.task : "New Task"}
            </div>
          </Heading>
          <button
            onClick={onClose}
            className="text-primary hover:text-secondary dark:hover:text-brand cursor-pointer"
            aria-label="Close sidebar"
          >
            <CircleX size={24} />
          </button>
        </div>

        {isLoading && (
          <div className="space-y-5 animate-pulse">
            <div className="space-y-2">
              <Skeleton className="h-4 w-[20px]" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-[20px]" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-[20px]" />
              <Skeleton className="h-8 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-[20px]" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        )}
        {error && <p className="text-error">{error}</p>}
        {formErrors.length > 0 && (
          <div className="mb-4">
            <ul className="text-error text-sm list-disc pl-5">
              {formErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        {!isLoading && !error && (
          <form onSubmit={handleFormSubmit} className="space-y-5">
            {!editingMode && (
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="task">Task</Label>
                <Input
                  type="text"
                  className="border-secondary text-[11px] text-primary"
                  id="task"
                  name="task"
                  value={taskData?.task}
                  onChange={handleStandardInputChange}
                  aria-required="true"
                />
              </div>
            )}
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="due">Due</Label>
              <Input
                type="date"
                className="border-secondary text-[11px] cursor-pointer text-primary"
                id="due"
                name="due"
                value={taskData?.due ? formatToYYYYMMDD(taskData.due) : ""}
                placeholder="Pick a Date"
                onChange={handleStandardInputChange}
                min={minDate}
                aria-required="true"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="owner">Owner</Label>
              <Input
                type="text"
                className="border-secondary text-[11px] text-primary"
                id="owner"
                name="owner"
                value={taskData?.owner}
                onChange={handleStandardInputChange}
                aria-required="true"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="status-select">Status</Label>{" "}
              <Select
                value={taskData?.status ? "true" : "false"}
                onValueChange={(value) => {
                  setTaskData((prevData) => {
                    if (!prevData) return null;
                    return { ...prevData, status: value === "true" };
                  });
                }}
              >
                <SelectTrigger
                  id="status-select"
                  className="border-secondary w-full text-[11px] cursor-pointer focus:border-brand text-primary"
                  aria-required="true"
                >
                  <SelectValue placeholder="Select status..." />
                </SelectTrigger>
                <SelectContent className="bg-secondary border-0">
                  <SelectItem
                    value="true"
                    className="cursor-pointer hover:bg-white text-[11px] text-primary"
                  >
                    Active
                  </SelectItem>
                  <SelectItem
                    value="false"
                    className="cursor-pointer hover:bg-white text-[11px] text-primary"
                  >
                    Inactive
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid w-full items-center gap-2.5">
              {" "}
              <div className="flex justify-between items-center">
                <Label htmlFor="progress">Progress</Label>
              </div>
              <Slider
                id="progress"
                name="progress"
                value={progress}
                onValueChange={(value) => setProgress(value)}
                max={100}
                step={1}
                className="w-full cursor-pointer"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress[0]}
                aria-label="Progress"
              />
            </div>
            <div className="mt-12 flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="bg-white text-primary dark:text-secondary hover:text-secondary  dark:hover:text-brand  cursor-pointer"
              >
                Cancel
              </Button>
              {editingMode && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleDelete}
                  disabled={!taskId || isLoading}
                  className="bg-white text-secondary dark:text-black hover:text-error dark:hover:text-error  cursor-pointer"
                >
                  Delete
                </Button>
              )}
              <Button
                type="submit"
                disabled={isSaving}
                className="bg-brand text-white hover:bg-secondary cursor-pointer"
              >
                {isSaving ? (
                  <div className="flex items-center gap-2">
                    <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white"></span>
                    Saving
                  </div>
                ) : editingMode ? (
                  "Update Task"
                ) : (
                  "Create Task"
                )}
              </Button>
            </div>
          </form>
        )}
      </aside>
    </>
  );
}
