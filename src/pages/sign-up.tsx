import Link from 'next/link';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import Form from '../components/Form';
import TextInput from '../components/TextInput';
import { signUp } from '../services/signUp';
import Router from 'next/router';
import { nanoid } from 'nanoid';

const SignUp = () => {
	const [formValues, setFormValues] = useState({
		email: '',
		password: '',
		passwordRepeat: '',
	});

	const defaultState = {
		loading: false,
		error: '',
	};

	const [state, setState] = useState(defaultState);

	const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const { email, password, passwordRepeat } = formValues;

		setState((currentState) => ({ ...currentState, loading: true }));

		if (password !== passwordRepeat) {
			setState(() => ({
				loading: false,
				error: "Passwords don't match!",
			}));
			return;
		}

		const { user, error } = await signUp(email, password);

		if (error) {
			setState(() => ({
				loading: false,
				error: error,
			}));
			return;
		}

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
				label="Sign Up"
			>
				<TextInput
					value={formValues.email}
					onChange={modifyFormValue('email')}
					placeholder="email@example.com"
					label="Enter your email address"
					type="email"
					id="email"
					required
				/>
				<TextInput
					value={formValues.password}
					onChange={modifyFormValue('password')}
					label="Create your password"
					type="password"
					id="password"
					required
				/>
				<TextInput
					value={formValues.passwordRepeat}
					onChange={modifyFormValue('passwordRepeat')}
					label="Repeat your password"
					type="password"
					id="password-verification"
					required
				/>
			</Form>
			<span className="mx-auto mt-8">
				Do you already have account?{' '}
				<span className="text-blue-600">
					<Link href="sign-in">Sign In</Link>
				</span>
				.
			</span>
		</div>
	);
};

export default SignUp;
