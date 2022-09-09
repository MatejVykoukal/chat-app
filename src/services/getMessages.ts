import { getApp } from 'firebase/app';
import {
	collection,
	query,
	getDocs,
	getFirestore,
	orderBy,
} from 'firebase/firestore';
import { Message } from '../types';

export const getMessages = async () => {
	const db = getFirestore(getApp());

	const q = query(
		collection(db, '/chat-rooms/cj87tMrqqEcRbJdpFsXT/messages'),
		orderBy('timestamp')
	);
	const querySnapshot = await getDocs(q);

	const messages = querySnapshot.docs.map((doc) => doc.data()) as Message[];

	return messages;
};
