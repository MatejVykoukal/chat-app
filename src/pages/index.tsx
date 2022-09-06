import { FormEvent, useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { setUserName } from '../services/setUser';
import { socketInitializer } from '../services/socketInitializer';
import { Message } from '../types';
import { nanoid } from 'nanoid';
import classnames from 'classnames';
import { scrollToBottom, useDictionary } from '../utils';
import { AuthAction, useAuthUser, withAuthUser } from 'next-firebase-auth';
import Loader from '../components/Loader';

let socket: Socket;

function Home() {
	const currentUser = useAuthUser();
	const messageEl = useRef<HTMLInputElement>(null);
	const [messages, setMessages] = useState<Message[]>([]);
	const [inputMessageText, setInputMessageText] = useState('');

	useEffect(() => {
		(async () => {
			socket = await socketInitializer(registerSocketEvents);
			if (!currentUser.displayName) {
				currentUser.displayName = await setUserName();
			}
		})();
	}, []);

	useEffect(() => {
		scrollToBottom('message-container-bottom');
	}, [messages]);

	const registerSocketEvents = (socket: Socket) => {
		socket.on('render-messsage', (message: Message) => {
			setMessages((currentMessages) => [...currentMessages, message]);
		});
	};

	const handleMessageSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (inputMessageText.trim().length === 0) {
			setInputMessageText('');
			return;
		}

		const message = {
			user: currentUser,
			id: nanoid(),
			message: inputMessageText,
			timestamp: Date.now().toString(),
		};

		setMessages((currentMessages) => [...currentMessages, message]);

		socket.emit('message-submit', message);
		setInputMessageText('');
	};

	return (
		<main className="flex flex-col">
			<div
				id="message-container"
				className="h-[calc(100vh-3rem)] overflow-y-scroll flex flex-col gap-2 p-4"
			>
				{messages.map((message) => (
					<div
						key={message.id}
						className={classnames('flex flex-col', {
							'self-end items-end': message.user.id === currentUser.id,
							'self-start items-start': message.user.id !== currentUser.id,
						})}
					>
						<span>
							{message.user.id === currentUser.id
								? useDictionary('me')
								: message.user.displayName}
						</span>
						<div
							className={classnames(
								'p-2 text-xl',
								message.user.id === currentUser.id
									? 'bg-blue-800'
									: 'bg-gray-800'
							)}
						>
							{message.message}
						</div>
					</div>
				))}
				<div className="w-0 h-0" id="message-container-bottom"></div>
			</div>
			<form
				className="flex text-xl w-full mt-auto h-12 absolute bottom-0"
				onSubmit={handleMessageSubmit}
			>
				<input
					onChange={(e) => {
						setInputMessageText(e.target.value);
					}}
					value={inputMessageText}
					ref={messageEl}
					type="text"
					className="w-auto grow px-4 py-2 bg-gray-800"
				/>
				<button type="submit" className="px-4 py-2 bg-blue-800">
					{useDictionary('send')}
				</button>
			</form>
		</main>
	);
}

export default withAuthUser({
	whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
	whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
	LoaderComponent: Loader,
})(Home);
