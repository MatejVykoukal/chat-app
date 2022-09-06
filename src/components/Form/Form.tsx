import { FC, HTMLProps, ReactNode } from 'react';

interface FormProps {
	label: string;
	error: string;
	loading: boolean;
	children: ReactNode;
}

const Form: FC<FormProps & HTMLProps<HTMLFormElement>> = ({
	children,
	label,
	error,
	loading,
	...rest
}) => {
	return (
		<div className="flex flex-col items-center">
			<h1 className="text-default-300 text-4xl mb-10">{label}</h1>
			<form {...rest} className="w-full max-w-sm flex flex-col gap-8">
				{error && <span className="text-xl text-red-500">{error}</span>}
				{children}
				<button
					disabled={loading}
					type="submit"
					className="disabled:opacity-50 disabled:pointer-events-none focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default Form;
