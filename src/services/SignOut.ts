import { getAuth, signOut as signOutFirebase } from 'firebase/auth';

export const signOut = async () => {
	const auth = getAuth();

	try {
		signOutFirebase(auth);
	} catch (error) {
		// const errorCode = error.code;
		const errorMessage = error.message;
		console.log(errorMessage);
	}
};
