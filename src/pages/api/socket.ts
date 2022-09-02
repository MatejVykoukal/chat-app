// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Server } from 'socket.io';
import { Message } from '../../types';

const SocketHandler = (req, res) => {
	if (res.socket.server.io) {
		console.log('Socket is already running');
	} else {
		console.log('Socket is initializing');
		const io = new Server(res.socket.server);
		res.socket.server.io = io;

		io.on('connection', (socket) => {
			socket.on('message-submit', (message: Message) => {
				socket.broadcast.emit('render-messsage', message);
			});
		});
	}
	res.end();
};

export default SocketHandler;
