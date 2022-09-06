import { FC, HTMLProps } from 'react';

interface TextInputProps {
	type: 'password' | 'text' | 'email';
	label: string;
	id: string;
}

const TextInput: FC<TextInputProps & HTMLProps<HTMLInputElement>> = ({
	type,
	label,
	required,
	id,
	...rest
}) => {
	return (
		<div>
			<label
				htmlFor={`${type}-${id}`}
				className="block mb-2 text-sm font-medium  text-gray-300"
			>
				{label}
				{required && <span className="text-red-500">*</span>}
			</label>
			<input
				type={type}
				required={required}
				id={`${type}-${id}`}
				className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
				{...rest}
			/>
		</div>
	);
};

export default TextInput;
