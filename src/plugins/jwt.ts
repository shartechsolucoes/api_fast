import fastifyJwt from 'fastify-jwt';
import fastifyPlugin from 'fastify-plugin';

export default fastifyPlugin(async (server) => {
	server.register(fastifyJwt, { secret: 'your-secret-key' });

	server.decorate('authenticate', async (request, reply) => {
		try {
			await request.jwtVerify();
		} catch (err) {
			reply.code(401).send({ message: 'Unauthorized' });
		}
	});
});
