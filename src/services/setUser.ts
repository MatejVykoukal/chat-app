import { getAuth, updateProfile } from 'firebase/auth';
const auth = getAuth();

export const setUserName = async () => {
	let userName = prompt('What is your username?', 'Unkown user');

	if (!userName) userName = 'Unknown user';

	try {
		await updateProfile(auth.currentUser, { displayName: userName });
		alert('Your username sucessfuly updated!');
		return userName;
	} catch {
		alert('Sorry, someting went wrong on our side.');
	}
};
