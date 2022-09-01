import { User } from '../types';
import { nanoid } from 'nanoid';

export const setUser = () => {
	const user: User = {
		fullName: prompt('What is your username?', 'Unkown user'),
		id: nanoid(),
	};
	if (!user.fullName) user.fullName = 'Unknown user';
	return user;
};
