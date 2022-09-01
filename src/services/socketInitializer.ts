import { io, Socket } from 'socket.io-client';

export const socketInitializer = async (callback: (socket: Socket) => void) => {
	await fetch('/api/socket');
	const socket = io();

	callback(socket);

	return socket;
};
