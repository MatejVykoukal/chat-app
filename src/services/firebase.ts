// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export const initializeFirebaseApp = () => {
	// Your web app's Firebase configuration
	const firebaseConfig = {
		apiKey: 'AIzaSyDnIRjcR-m2DZScR_yYjWvI_SMVTcXYIOY',
		authDomain: 'chat-app-ad044.firebaseapp.com',
		projectId: 'chat-app-ad044',
		storageBucket: 'chat-app-ad044.appspot.com',
		messagingSenderId: '585185990522',
		appId: '1:585185990522:web:26c0874b5a1bfcbd7ae8c3',
	};

	// Initialize Firebase
	const firebaseApp = initializeApp(firebaseConfig);

	return firebaseApp;
};
