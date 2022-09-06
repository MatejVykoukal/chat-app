import { getAuth, createUserWithEmailAndPassword, User } from 'firebase/auth';

interface SignUpResponse {
	error: string;
	user: User;
}

export const signUp = async (email: string, password: string) => {
	const auth = getAuth();
	let response: SignUpResponse = {
		user: null,
		error: '',
	};

	try {
		const { user } = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);

		response.user = user;
	} catch (error) {
		// const errorCode = error.code;
		const errorMessage = error.message;

		response.error = errorMessage;
	}
	return response;
};
