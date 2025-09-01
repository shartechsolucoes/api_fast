import { FastifyInstance } from 'fastify';

export default async function pingRoutes(server: FastifyInstance) {
	server.get('/ping', async (request, reply) => {
		return reply.send({ message: 'pong' });
	});
}
