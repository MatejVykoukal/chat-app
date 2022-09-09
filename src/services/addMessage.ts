import { getApp } from 'firebase/app';
import { collection, addDoc } from 'firebase/firestore';

import { getFirestore } from 'firebase/firestore';
import { Message } from '../types';

export const addMessage = async (message: Message) => {
	const db = getFirestore(getApp());

	try {
		const docRef = await addDoc(
			collection(db, '/chat-rooms/cj87tMrqqEcRbJdpFsXT/messages'),
			message
		);
		console.log('Document written with ID: ', docRef.id);
	} catch (e) {
		console.error('Error adding document: ', e);
	}
};
