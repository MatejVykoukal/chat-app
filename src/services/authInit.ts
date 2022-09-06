import { init } from 'next-firebase-auth';

const initAuth = () => {
	init({
		authPageURL: '/sign-in',
		appPageURL: '/',
		loginAPIEndpoint: '/api/login', // required
		logoutAPIEndpoint: '/api/logout', // required
		onLoginRequestError: (err) => {
			console.error(err);
		},
		onLogoutRequestError: (err) => {
			console.error(err);
		},
		firebaseAdminInitConfig: {
			credential: {
				projectId: 'chat-app-ad044',
				clientEmail: 'example-abc123@my-example-app.iam.gserviceaccount.com',
				// The private key must not be accessible on the client side.
				privateKey: process.env.FIREBASE_PRIVATE_KEY,
			},
			databaseURL: 'https:/chat-app-ad044.firebaseio.com',
		},
		// Use application default credentials (takes precedence over firebaseAdminInitConfig if set)
		// useFirebaseAdminDefaultCredential: true,
		firebaseClientInitConfig: {
			apiKey: 'AIzaSyDnIRjcR-m2DZScR_yYjWvI_SMVTcXYIOY', // required
			authDomain: 'chat-app-ad044.firebaseapp.com',
			databaseURL: 'https://chat-app-ad044.firebaseio.com',
			projectId: 'chat-app-ad044',
		},
		cookies: {
			name: 'chat-app-ad044', // required
			// Keys are required unless you set `signed` to `false`.
			// The keys cannot be accessible on the client side.
			keys: [
				process.env.COOKIE_SECRET_CURRENT,
				process.env.COOKIE_SECRET_PREVIOUS,
			],
			httpOnly: true,
			maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
			overwrite: true,
			path: '/',
			sameSite: 'strict',
			secure: false, // set this to false in local (non-HTTPS) development
			signed: true,
		},
		onVerifyTokenError: (err) => {
			console.error(err);
		},
		onTokenRefreshError: (err) => {
			console.error(err);
		},
	});
};

export default initAuth;
