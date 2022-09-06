import { AuthUserContext } from 'next-firebase-auth';

export interface Message {
	user: AuthUserContext;
	message: string;
	id: string;
	timestamp: string;
}
