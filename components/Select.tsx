import React from "react";

export const Select: React.FC<React.HTMLProps<HTMLSelectElement>> = ({
	children,
	...props
}) => {
	return (
		<select
			className='px-2 py-2 border border-gray-200 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-300 focus:outline-none'
			{...props}
		>
			<option value=''>Select an option</option>
			{children}
		</select>
	);
};
