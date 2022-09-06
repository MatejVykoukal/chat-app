import Link from 'next/link';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import Form from '../components/Form';
import TextInput from '../components/TextInput';
import { signIn } from '../services/signIn';
import Router from 'next/router';

const SignIn = () => {
	const [formValues, setFormValues] = useState({
		email: '',
		password: '',
	});

	const defaultState = {
		loading: false,
		error: '',
	};

	const [state, setState] = useState(defaultState);

	const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const { email, password } = formValues;

		setState((currentState) => ({ ...currentState, loading: true }));

		const { user, error } = await signIn(email, password);

		if (error) {
			setState(() => ({
				loading: false,
				error: error,
			}));
			return;
		}

		setState(defaultState);

		Router.push('/');
	};

	const modifyFormValue =
		(formValue: keyof typeof formValues) =>
		(e: ChangeEvent<HTMLInputElement>) => {
			setFormValues((currentState) => ({
				...currentState,
				[formValue]: e.target.value,
			}));
		};

	return (
		<div className="h-screen flex flex-col justify-center">
			<Form
				onSubmit={handleFormSubmit}
				error={state.error}
				loading={state.loading}
				label="Sign In"
			>
				<TextInput
					value={formValues.email}
					onChange={modifyFormValue('email')}
					label="Enter your email address"
					type="email"
					id="email"
					required
				/>
				<TextInput
					value={formValues.password}
					onChange={modifyFormValue('password')}
					label="Enter your password"
					type="password"
					id="password"
					required
				/>
			</Form>
			<span className="mx-auto mt-8">
				Don't you have account yet?{' '}
				<span className="text-blue-600">
					<Link href="sign-up">Sign Up</Link>
				</span>
				.
			</span>
		</div>
	);
};

export default SignIn;
