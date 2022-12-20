import React, { useState } from "react";
import { ArrowDown } from "../svg/ArrowDown";
import { ArrowUp } from "../svg/ArrowUp";
import { ColumnType, LoggerDataType, SortType } from "../types";

interface DataTableProps {
	columns: ColumnType[];
	data: any[];
	keyField: string;
	page: number;
	limit: number;
	handleSort: (s: keyof LoggerDataType) => void;
	sortDetails: SortType;
}

export const DataTable: React.FC<DataTableProps> = ({
	columns,
	data,
	keyField,
	page,
	limit,
	handleSort,
	sortDetails,
}) => {
	return (
		<>
			<table className='border-collapse w-full mb-6'>
				<thead>
					<tr>
						{columns.map((col, index) => {
							return (
								<th
									className={`border-b border-gray-300 px-4 py-4 text-left ${
										col.sortable ? "cursor-pointer" : ""
									}`}
									key={col.label + index}
									onClick={
										col.sortable
											? () => handleSort(col.attribute as keyof LoggerDataType)
											: undefined
									}
								>
									<div className='flex items-center'>
										<span className='mr-2'>{col.label}</span>
										{col.sortable && sortDetails.field === col.attribute ? (
											sortDetails.dir === "asc" ? (
												<span>
													<ArrowDown />
												</span>
											) : (
												<span>
													<ArrowUp />
												</span>
											)
										) : null}
									</div>
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody>
					{data.length === 0 && (
						<tr>
							<td
								colSpan={columns.length}
								className='border-b border-gray-200 px-4 py-4 text-center'
							>
								No data found
							</td>
						</tr>
					)}
					{data
						.slice((page - 1) * limit, (page - 1) * limit + 9)
						.map((dat, datIndex) => {
							return (
								<tr key={dat[keyField] + datIndex}>
									{columns.map((col) => {
										return (
											<td
												className='border-b border-gray-200 px-4 py-4 text-left'
												key={col.attribute + dat[keyField] + datIndex}
											>
												{dat[col.attribute]}
											</td>
										);
									})}
								</tr>
							);
						})}
				</tbody>
			</table>
		</>
	);
};
