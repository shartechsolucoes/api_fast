import { FastifyReply, FastifyRequest } from 'fastify';
import { ServiceRequest } from '../entity/ServiceRequest';
import { AppDataSource } from '../data-source';

export class ServiceRequestController {
	static async create(request: FastifyRequest, reply: FastifyReply) {
		const repo = AppDataSource.getRepository(ServiceRequest);
		try {
			const data = request.body as Partial<ServiceRequest>;
			const serviceRequest = repo.create(data);
			await repo.save(serviceRequest);
			reply.code(201).send(serviceRequest);
		} catch (err) {
			reply
				.code(400)
				.send({ message: 'Erro ao criar solicitação', error: err });
		}
	}

	static async findAll(request: FastifyRequest, reply: FastifyReply) {
		const repo = AppDataSource.getRepository(ServiceRequest);
		const all = await repo.find();
		reply.send(all);
	}

	static async findOne(request: FastifyRequest, reply: FastifyReply) {
		const repo = AppDataSource.getRepository(ServiceRequest);
		const { id } = request.params as { id: string };
		const item = await repo.findOneBy({ id: Number(id) });
		if (!item) return reply.code(404).send({ message: 'Not found' });
		reply.send(item);
	}

	static async update(request: FastifyRequest, reply: FastifyReply) {
		const repo = AppDataSource.getRepository(ServiceRequest);
		const { id } = request.params as { id: string };
		const data = request.body as Partial<ServiceRequest>;
		let item = await repo.findOneBy({ id: Number(id) });
		if (!item) return reply.code(404).send({ message: 'Not found' });
		repo.merge(item, data);
		await repo.save(item);
		reply.send(item);
	}

	static async remove(request: FastifyRequest, reply: FastifyReply) {
		const repo = AppDataSource.getRepository(ServiceRequest);
		const { id } = request.params as { id: string };
		const item = await repo.findOneBy({ id: Number(id) });
		if (!item) return reply.code(404).send({ message: 'Not found' });
		await repo.remove(item);
		reply.send({ message: 'Removido com sucesso' });
	}
}
