import * as React from "react";
import { Text } from "../common/Text";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
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

type TaskData = {
  id: number;
  task: string;
  due: string;
  owner: string;
  status: boolean;
  progress: number;
};

const data: TaskData[] = [];

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
      const statusColor = status ? "bg-brand" : "bg-secondary";
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
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
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
                      className=" border-secondary bg-tertiary text-primary  font-bold"
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
    </div>
  );
}

export default TaskTable;
