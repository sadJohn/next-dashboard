'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/ui/table";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
  }

const TTable = <TData, TValue>({columns, data}: DataTableProps<TData, TValue>) => {
    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
      });
    
    return ( <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            );
          })}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext(),
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table> );
}
 
export default TTable;