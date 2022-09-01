export interface User {
	id: string;
	fullName: string;
}

export interface Message {
	user: User;
	message: string;
	id: string;
	timestamp: string;
}
