import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/user.controller';

const userController = new UserController();

export default function userRoutes(server: FastifyInstance) {
	server.get('/users', async () => userController.getAll());
	server.get('/users/:id', async (request) => {
		// @ts-ignore
		return userController.getById(request.params.id);
	});
	server.post('/users', async (request) => {
		// @ts-ignore
		return userController.create(request.body);
	});
	server.put('/users/:id', async (request) => {
		// @ts-ignore
		return userController.update(request.params.id, request.body);
	});
	server.delete('/users/:id', async (request) => {
		// @ts-ignore
		return userController.delete(request.params.id);
	});
}
