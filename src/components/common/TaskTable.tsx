import { Text } from "../common/Text";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  RowData,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Progress } from "../ui/progress";
import { useEffect, useMemo, useState } from "react";
import { fetchTasks } from "../../services/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Plus, Search, SquarePen } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

export type TaskData = {
  id: number;
  task: string;
  due: Date;
  owner: string;
  status: boolean;
  progress: number;
};

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    className?: string;
  }
}

interface TaskTableProps {
  onEditTask: (taskId: number | undefined) => void;
  isTableChanged: boolean;
}

export function TaskTable({ onEditTask, isTableChanged }: TaskTableProps) {
  const [data, setTasks] = useState<TaskData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const columns = useMemo<ColumnDef<TaskData>[]>(
    () => [
      {
        accessorKey: "task",
        enableHiding: false,
        header: () => (
          <Text fontSize="11px" fontWeight="700">
            Task
          </Text>
        ),
        cell: ({ row }) => (
          <div
            className="text-left cursor-pointer break-words whitespace-normal"
            onClick={() => onEditTask(row.original.id)}
          >
            <Text fontWeight="400">
              <div className="capitalize">{row.getValue("task")}</div>
            </Text>
          </div>
        ),
      },
      {
        accessorKey: "due",
        meta: {
          className: "hidden md:table-cell text-center",
        },
        header: () => (
          <Text fontSize="11px" fontWeight="700">
            Due
          </Text>
        ),
        cell: ({ row }) => (
          <Text fontWeight="400">
            {new Date(row.getValue("due")).toLocaleDateString()}
          </Text>
        ),
      },
      {
        accessorKey: "owner",
        meta: {
          className: "hidden sm:table-cell text-center",
        },
        header: () => (
          <Text fontSize="11px" fontWeight="700">
            Owner
          </Text>
        ),
        cell: ({ row }) => (
          <Text fontWeight="400">{row.getValue("owner")}</Text>
        ),
      },
      {
        accessorKey: "status",
        meta: {
          className: "hidden md:table-cell text-center",
        },
        header: () => (
          <Text fontSize="11px" fontWeight="700">
            Status
          </Text>
        ),
        cell: ({ row }) => {
          const status = row.getValue("status");
          const statusColor = status ? "bg-brand" : "bg-secondary";
          const statusText = status ? "On track" : "No status";
          return (
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${statusColor}`}
                aria-hidden="true"
              />
              <Text fontWeight="400">{statusText}</Text>
            </div>
          );
        },
      },
      {
        accessorKey: "progress",
        header: () => (
          <Text fontSize="11px" fontWeight="700">
            Progress
          </Text>
        ),
        cell: ({ row }) => {
          const progress = row.getValue("progress");
          console.log("Progress data:", progress);
          const progressValue = typeof progress === "number" ? progress : 0;
          return (
            <Progress
              value={progressValue}
              style={{ width: "90px", height: "6px" }}
              aria-label={`Progress: ${progressValue}%`}
            />
          );
        },
      },
      {
        id: "edit",
        meta: {
          className: "hidden sm:table-cell text-center",
        },
        header: () => <></>,
        cell: ({ row }) => (
          <SquarePen
            className="w-4 h-4 cursor-pointer text-brand hover:text-secondary"
            onClick={() => onEditTask(row.original.id)}
            tabIndex={0}
            role="button"
            aria-label={`Edit task ${row.original.task}`}
          />
        ),
      },
    ],
    [onEditTask]
  );

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch tasks");
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, [isTableChanged]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4"></div>

      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <Input
            type="search"
            placeholder="Search tasks"
            className="w-full p-2 border text-primary border-secondary rounded pr-10"
            onChange={(e) =>
              table.getColumn("task")?.setFilterValue(e.target.value)
            }
            aria-label="Search tasks"
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary cursor-pointer"
            aria-hidden="true"
          >
            <Search className="w-4 h-4" />
          </span>
        </div>
        <Button
          className="ml-4 px-4 py-2 bg-brand text-white rounded hover:bg-secondary cursor-pointer"
          onClick={() => onEditTask(undefined)}
          aria-label="Add new task"
        >
          <Plus />
          Add Task
        </Button>
      </div>
      <div className="rounded-[4px] border border-secondary">
        <Table className="rounded-md overflow-hidden table-auto pb-2">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-secondary">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn(
                      "border-secondary bg-tertiary dark:bg-black text-primary font-bold",
                      header.column.columnDef.meta?.className
                    )}
                    scope="col"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-secondary text-primary"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(cell.column.columnDef.meta?.className)}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-primary"
                >
                  {loading ? (
                    <div
                      className="w-full animate-pulse"
                      aria-live="polite"
                      aria-busy="true"
                    >
                      <Skeleton count={5} className="flex items-center " />
                    </div>
                  ) : (
                    <div className="min-w-[600px]">No results.</div>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {error && (
        <div
          className="text-error mb-4 p-2 border border-error rounded"
          role="alert"
        >
          Error: {error}
        </div>
      )}
    </div>
  );
}

export default TaskTable;
