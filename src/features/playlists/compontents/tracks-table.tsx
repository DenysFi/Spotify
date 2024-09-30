import {
	TableBody,
	TableCell,
	TableElement,
	TableHeader,
	TableRow,
	tableRowVariants,
} from "@/components/ui/table/Table"
import React from "react"
import { TableTrackSkeleton } from "./table-track-skeleton"
import { type VariantProps } from "class-variance-authority"

interface TableColumns<T> {
	title: React.ReactNode
	field: string
	Cell: ({ entry, index }: { entry: T; index: number }) => React.ReactNode
}

type TracksTableProps<T> = {
	data: T[] | undefined
	columns: TableColumns<T>[]
	isLoading: boolean
	ids: string[] | undefined
} & VariantProps<typeof tableRowVariants>

function TracksTable<T>({
	data,
	ids,
	grid,
	columns,
	isLoading,
}: TracksTableProps<T>) {
	return (
		<TableElement>
			<TableHeader>
				<TableRow grid={grid} className="h-full items-center ">
					{columns.map(({ field, title }) => (
						<TableCell key={field}>{title}</TableCell>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{data?.map((entry, index) => (
					<TableRow key={ids![index] + index} grid={grid} className="h-14 ">
						{columns.map(({ field, title, Cell }) => (
							<TableCell key={field + title} className="relative ">
								<Cell entry={entry} index={index} />
							</TableCell>
						))}
					</TableRow>
				))}
				{isLoading &&
					new Array(20)
						.fill(0)
						.map((_, index) => <TableTrackSkeleton key={index} />)}
			</TableBody>
		</TableElement>
	)
}

export default TracksTable
