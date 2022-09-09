export interface Message {
	user: {
		id: string;
		displayName: string;
	};
	message: string;
	id: string;
	timestamp: string;
}
