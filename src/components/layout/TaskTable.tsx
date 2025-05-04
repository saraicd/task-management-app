import { Text } from "../common/Text";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
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
import { useEffect, useState } from "react";
import { fetchTasks } from "../../services/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export type TaskData = {
  id: number;
  task: string;
  due: string;
  owner: string;
  status: boolean;
  progress?: number;
};

export const columns: ColumnDef<TaskData>[] = [
  {
    accessorKey: "task",
    header: () => {
      return (
        <Text fontSize="11px" fontWeight="700">
          Task
        </Text>
      );
    },
    cell: ({ row }) => (
      <div className="text-left">
        <Text fontWeight="400">{row.getValue("task")}</Text>
      </div>
    ),
  },
  {
    accessorKey: "due",
    header: () => {
      return (
        <Text fontSize="11px" fontWeight="700">
          Due
        </Text>
      );
    },
    cell: ({ row }) => (
      <Text fontWeight="400">
        {new Date(row.getValue("due")).toLocaleDateString()}
      </Text>
    ),
  },
  {
    accessorKey: "owner",
    header: () => {
      return (
        <Text fontSize="11px" fontWeight="700">
          Owner
        </Text>
      );
    },
    cell: ({ row }) => <Text fontWeight="400">{row.getValue("owner")}</Text>,
  },
  {
    accessorKey: "status",
    header: () => {
      return (
        <Text fontSize="11px" fontWeight="700">
          Status
        </Text>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status");
      const statusColor = status ? "bg-secondary" : "bg-brand";
      const statusText = status ? "No status" : "On track";
      return (
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${statusColor}`} />
          <Text fontWeight="400">{statusText}</Text>
        </div>
      );
    },
  },
  {
    accessorKey: "progress",
    header: () => {
      return (
        <Text fontSize="11px" fontWeight="700">
          Progress
        </Text>
      );
    },
    cell: () => {
      const progressValue = Math.floor(Math.random() * 101);
      return (
        <Progress
          value={progressValue}
          style={{ width: "90px", height: "6px" }}
        />
      );
    },
  },
];

export function TaskTable() {
  const [data, setTasks] = useState<TaskData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchTasks();
        console.log("Fetched tasks:", data);
        setTasks(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch tasks");
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return loading ? (
    <div>
      <Skeleton count={5} className="w-full" />
    </div>
  ) : (
    <div className="w-full">
      <div className="flex items-center py-4"></div>
      <div className="rounded-[4px] border border-secondary">
        <Table className="rounded-md overflow-hidden">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className=" border-secondary">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className=" border-secondary bg-tertiary dark:bg-black text-primary  font-bold"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className=" border-secondary text-primary"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {error && (
        <div className="text-error mb-4 p-2 border border-error rounded">
          Error: {error}
        </div>
      )}
    </div>
  );
}

export default TaskTable;
