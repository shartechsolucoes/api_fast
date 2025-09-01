import { FastifyInstance } from 'fastify';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import bcrypt from 'bcryptjs';

export default async function authRoutes(server: FastifyInstance) {
	server.post('/login', async (request, reply) => {
		const { email, password } = request.body as {
			email: string;
			password: string;
		};
		const userRepo = AppDataSource.getRepository(User);
		const user = await userRepo.findOneBy({ email });

		if (!user || !(await bcrypt.compare(password, user.password))) {
			return reply.code(401).send({ message: 'Invalid credentials' });
		}

		const token = server.jwt.sign({ id: user.id, email: user.email });
		return { token };
	});
}
