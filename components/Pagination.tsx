import React from "react";

interface PaginationProps {
	total: number;
	limit: number;
	page: number;
	setPage: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
	total,
	limit,
	page,
	setPage,
}) => {
	let totalPages = Math.ceil(total / limit);
	return (
		<div className='flex justify-center items-center'>
			<button
				className='p-2 bg-white border border-gray-300 hover:bg-gray-200'
				disabled={page === 1}
				onClick={() => setPage(1)}
			>{`<<`}</button>
			{page > 1 && (
				<button
					className='p-2 bg-white border border-gray-300 hover:bg-gray-200'
					onClick={() => setPage(page - 1)}
				>
					{page - 1}
				</button>
			)}
			<button className='p-2 bg-blue-700 border text-white border-blue-800 hover:bg-blue-800'>
				{page}
			</button>
			{page < totalPages && (
				<button
					className='p-2 bg-white border border-gray-300 hover:bg-gray-200'
					onClick={() => setPage(page + 1)}
				>
					{page + 1}
				</button>
			)}
			<button
				className='p-2 bg-white border border-gray-300 hover:bg-gray-200'
				disabled={page === totalPages}
				onClick={() => setPage(totalPages)}
			>{`>>`}</button>
		</div>
	);
};
