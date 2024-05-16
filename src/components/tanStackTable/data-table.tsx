"use client"
import { Activity } from '@prisma/client'
import { ActivityItemRow } from "./activity-item-row";
import { DataTableFacetedFilter } from './data-table-faceted-filter'
import {
	ColumnFiltersState,
	getFacetedRowModel,
	getFacetedUniqueValues,
	VisibilityState,
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	useReactTable,
	SortingState,
	getSortedRowModel,
} from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
 TableFooter,
	TableRow,
} from "@/components/ui/table"
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { DataTableToolbar } from './data-table-toolbar'
import { useState } from 'react';

interface DataTableProps<TData, TValue> {
	columns: any
	data: any
}

export function DataTable<TData, TValue>({
	columns,
	data,
	// projects,
	// clients

}: any) {

	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
	const [sorting, setSorting] = useState<SortingState>([])
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
	const [rowSelection, setRowSelection] = useState({})
 // const [state,setState] = useState('default')

	const table = useReactTable({
		data,
		columns,
  
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
		onColumnFiltersChange: setColumnFilters,
		enableRowSelection: true,
		onRowSelectionChange: setRowSelection,
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),

	})

	// console.log('data-table, table getTableRows,', table.getRowModel().rows[0].getVisibleCells())

	return (
		
			<Table id='table' >
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
									</TableHead>
								)
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody >
					{

						table.getRowModel().rows?.length ? (

							table.getRowModel().rows.map((row) => (
        

								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
				</TableBody>
    {/* <TableFooter>
     <span>footer</span>
    </TableFooter> */}
			</Table>
		// </div>
	)
}
