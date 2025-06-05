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
import { Alert, AlertDescription } from "../ui/alert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AnimatePresence, motion } from "framer-motion";
import { ConfirmButton } from "../common/ConfirmButton";

interface EditSidebarProps {
  isOpen: boolean;
  taskId: number | null;
  onClose: () => void;
  onSave: (newTask: TaskData) => void;
  onUpdate: (updatedTask: TaskData) => void;
  onDelete: (taskId: number) => void;
}

export function EditSidebar({
  isOpen,
  taskId,
  onClose,
  onSave,
  onUpdate,
  onDelete,
}: EditSidebarProps) {
  const [taskData, setTaskData] = useState<TaskData | null>(null);
  const [editingMode, setEditingMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFormErrors([]);
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
      setTaskData({ status: false } as TaskData);
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
    const { name, value } = event.target;

    setTaskData((prevData) => {
      const valueToStore = value;

      return {
        ...prevData,
        [name]: valueToStore,
      } as TaskData;
    });
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setTaskData(
        (prevData) =>
          ({
            ...prevData,
            due: date,
          } as TaskData)
      );
    }
  };

  const validateForm = () => {
    const errors = [];
    if (!taskData?.task?.trim()) {
      errors.push("Task name is required.");
    }
    if (!taskData?.due) {
      errors.push("Due date is required.");
    }
    if (!taskData?.owner?.trim()) {
      errors.push("Owner is required.");
    }
    return errors;
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setFormErrors([]);
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setFormErrors(validationErrors);
      return;
    }
    setIsSaving(true);
    if (taskData && editingMode) {
      onUpdate(taskData);
    }
    if (taskData && !editingMode) {
      onSave(taskData);
    } else setIsSaving(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-primary bg-opacity-20 z-40"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <>
              <aside
                ref={sidebarRef}
                tabIndex={-1}
                role="dialog"
                aria-labelledby="edit-sidebar-heading"
                aria-hidden={!isOpen}
                className={`edit-side-bar fixed top-0 right-0 h-full w-80 md:w-96 bg-white shadow-lg p-6 z-50  overflow-y-auto }`}
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
                    {[10, 10, 8, 10].map((height, index) => (
                      <div key={index} className="space-y-2">
                        <Skeleton className="h-8 w-[20px]" />
                        <Skeleton className={`h-${height} w-full`} />
                      </div>
                    ))}
                  </div>
                )}
                {error && <p className="text-error">{error}</p>}
                {formErrors.length > 0 && (
                  <Alert variant="destructive" className="mb-4 text-error">
                    <CircleX className="mr-2 h-4 w-4" />
                    <AlertDescription>
                      <ul className="pl-5 text-sm text-left">
                        {formErrors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}
                {!isLoading && !error && (
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    {!editingMode && (
                      <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="task">Task</Label>
                        <Input
                          type="text"
                          className="border-secondary text-[11px] text-primary selection:text-black"
                          id="task"
                          name="task"
                          value={taskData?.task}
                          onChange={handleStandardInputChange}
                          aria-required="true"
                          maxLength={100}
                        />
                      </div>
                    )}
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="due">Due</Label>
                      <DatePicker
                        id="due"
                        selected={taskData?.due ? new Date(taskData.due) : null}
                        onChange={(date) => handleDateChange(date)}
                        dateFormat="dd-MM-yyyy"
                        minDate={new Date()}
                        placeholderText="Pick a Date"
                        className="border-1 border-secondary text-[11px] cursor-pointer text-primary flex h-9 w-full focus-visible:border-brand rounded-md bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent  file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                        aria-required="true"
                      />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="owner">Owner</Label>
                      <Input
                        type="text"
                        className="border-secondary text-[11px] text-primary selection:text-black"
                        id="owner"
                        name="owner"
                        maxLength={50}
                        value={taskData?.owner}
                        onChange={handleStandardInputChange}
                        aria-required="true"
                      />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="status-select">Status</Label>
                      <Select
                        value={taskData?.status ? "On track" : "No status"}
                        onValueChange={(value) => {
                          console.log("Selected value:", value, taskData);
                          setTaskData(
                            (prevData) =>
                              ({
                                ...prevData,
                                status: value === "On track",
                              } as TaskData)
                          );
                        }}
                      >
                        <SelectTrigger
                          id="status-select"
                          className="border-secondary w-full text-[11px] cursor-pointer focus:border-brand text-primary"
                          aria-required="true"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-secondary border-0">
                          <SelectItem
                            value="On track"
                            className="cursor-pointer hover:bg-white text-[11px] text-primary"
                          >
                            On track
                          </SelectItem>
                          <SelectItem
                            value="No status"
                            className="cursor-pointer hover:bg-white text-[11px] text-primary"
                          >
                            No status
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
                        value={[taskData?.progress ?? 0]}
                        onValueChange={(value) => {
                          setTaskData(
                            (prevData) =>
                              ({
                                ...prevData,
                                progress: value[0],
                              } as TaskData)
                          );
                        }}
                        max={100}
                        step={1}
                        className="w-full cursor-pointer"
                        aria-valuemin={0}
                        aria-valuemax={100}
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
                        <ConfirmButton
                          onConfirm={() => {
                            if (taskId !== null) {
                              onDelete(taskId);
                            }
                          }}
                          confirmText="Delete"
                          title="Delete this task?"
                          description="This will permanently remove the task from the list."
                          confirmVariant="destructive"
                        >
                          <Button
                            type="button"
                            variant="outline"
                            disabled={!taskId || isLoading}
                            className="bg-black text-brand dark:text-brand hover:text-error dark:hover:text-error  cursor-pointer"
                          >
                            Delete
                          </Button>
                        </ConfirmButton>
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
