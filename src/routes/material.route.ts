import { FastifyInstance } from 'fastify';
import { MaterialController } from '../controllers/materials.controllers';
import { Material } from '../entity/Material';

const materialController = new MaterialController();

export default function materialRoutes(server: FastifyInstance) {
	server.get('/materials', async () => materialController.getAll());

	server.get('/materials/:id', async (request) => {
		const { id } = request.params as { id: string };
		return materialController.getById(id);
	});

	server.post('/materials', async (request, reply) => {
		const body = request.body as {
			name: string;
			unit: string;
			type: string;
			notes?: string;
			companyId: string;
		};
		const result = await materialController.create(body);
		if ('error' in result) {
			return reply.code(result.error).send({ message: result.message });
		}
		return result;
	});

	server.put('/materials/:id', async (request) => {
		const { id } = request.params as { id: string };
		return materialController.update(id, request.body);
	});

	server.delete('/materials/:id', async (request) => {
		const { id } = request.params as { id: string };
		return materialController.delete(id);
	});
}
