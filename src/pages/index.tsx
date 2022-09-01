import { FormEvent, useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { setUser } from '../services/setUser';
import { socketInitializer } from '../services/socketInitializer';
import { Message, User } from '../types';
import { nanoid } from 'nanoid';
import classnames from 'classnames';
import { scrollToBottom, useDictionary } from '../utils';
import { defaultDictionary } from '../constants';

let currrentUser: User;
let socket: Socket;

export default function Home() {
	const messageEl = useRef<HTMLInputElement>(null);
	const [messages, setMessages] = useState<Message[]>([]);
	const [inputMessageText, setInputMessageText] = useState('');

	useEffect(() => {
		(async () => {
			socket = await socketInitializer(registerSocketEvents);
			currrentUser = setUser();
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
			user: currrentUser,
			id: nanoid(),
			message: inputMessageText,
			timestamp: Date.now().toString(),
		};

		setMessages((currentMessages) => [...currentMessages, message]);

		socket.emit('message-submit', message);
		setInputMessageText('');
	};

	return (
		<main className="flex flex-col bg-gray-900 text-white">
			<div
				id="message-container"
				className="h-[calc(100vh-3rem)] overflow-y-scroll flex flex-col gap-2 p-4"
			>
				{messages.map((message) => (
					<div
						className={classnames('flex flex-col', {
							'self-end items-end': message.user.id === currrentUser.id,
							'self-start items-start': message.user.id !== currrentUser.id,
						})}
					>
						<span>
							{message.user.id === currrentUser.id
								? useDictionary('me')
								: message.user.fullName}
						</span>
						<div
							className={classnames(
								'p-2 text-xl',
								message.user.id === currrentUser.id
									? 'bg-blue-800'
									: 'bg-gray-800'
							)}
							key={message.id}
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
