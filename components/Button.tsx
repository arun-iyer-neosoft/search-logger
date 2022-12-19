import React from "react";

interface ButtonProps {
	type?: "button" | "submit" | "reset";
	color?: "blue" | "gray";
}

export const Button: React.FC<
	ButtonProps & React.HTMLProps<HTMLButtonElement>
> = ({ children, type = "button", color = "blue", ...rest }) => {
	const colorClass =
		color === "blue"
			? " bg-blue-700 border-blue-800 text-white hover:bg-blue-800"
			: " bg-gray-200 border-gray-300 hover:bg-gray-300";
	return (
		<button
			className={
				"px-4 py-2 min-w-[120px] text-cente border self-end" + colorClass
			}
			{...rest}
			type={type}
		>
			{children}
		</button>
	);
};
