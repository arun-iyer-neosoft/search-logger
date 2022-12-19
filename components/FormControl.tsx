import React from "react";

interface FormControlProps {
	name: string;
	label?: string;
	type?: string;
	CustomInput?: () => JSX.Element;
}

export const FormControl: React.FC<
	FormControlProps & React.HTMLProps<HTMLInputElement>
> = ({ name, label, type = "text", CustomInput, ...rest }) => {
	return (
		<div>
			{label && (
				<label htmlFor={name} className='mb-1 block font-semibold'>
					{label}
				</label>
			)}
			{CustomInput ? (
				<CustomInput />
			) : (
				<input
					type={type}
					name={name}
					id={name}
					className='px-2 py-2 border border-gray-200 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-300 focus:outline-none'
					{...rest}
				/>
			)}
		</div>
	);
};
