import { getAuth, signInWithEmailAndPassword, User } from 'firebase/auth';

interface SignInResponse {
	error: string;
	user: User;
}

export const signIn = async (email: string, password: string) => {
	const auth = getAuth();
	let response: SignInResponse = {
		user: null,
		error: '',
	};

	try {
		const { user } = await signInWithEmailAndPassword(auth, email, password);

		response.user = user;
	} catch (error) {
		// const errorCode = error.code;
		const errorMessage = error.message;

		response.error = errorMessage;
	}
	return response;
};
