import { AuthAction, useAuthUser, withAuthUser } from 'next-firebase-auth';
import Loader from '../components/Loader';
import { signOut } from '../services/SignOut';

const Demo = () => {
	const AuthUser = useAuthUser();
	return (
		<div>
			<p>Your email is {AuthUser.email ? AuthUser.email : 'unknown'}.</p>
			<button onClick={signOut}>logout</button>
		</div>
	);
};

export default withAuthUser({
	whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
	whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
	LoaderComponent: Loader,
})(Demo);
