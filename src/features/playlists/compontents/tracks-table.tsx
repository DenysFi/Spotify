import {
	TableBody,
	TableCell,
	TableElement,
	TableHeader,
	TableRow,
} from "@/components/ui/table/table"
import React from "react"
import type { TrackItemsType } from "../api/get-playlists"
import { TableTrackSkeleton } from "./table-track-skeleton"

interface TableColumns {
	title: React.ReactNode
	field: string
	Cell: ({
		entry,
		index,
	}: {
		entry: TrackItemsType
		index: number
	}) => React.ReactNode
}

interface TracksTableProps {
	data: TrackItemsType[] | undefined
	columns: TableColumns[]
	isLoading: boolean
}

function TracksTable({ data, columns, isLoading }: TracksTableProps) {
	return (
		<TableElement>
			<TableHeader>
				<TableRow className=" h-full items-center">
					{columns.map(({ field, title }) => (
						<TableCell key={field}>{title}</TableCell>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{data?.map((entry, index) => (
					<TableRow key={entry.track.id + index} className="h-14 ">
						{columns.map(({ field, title, Cell }) => (
							<TableCell key={field + title} className="relative">
								<Cell entry={entry} index={index + 1} />
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
