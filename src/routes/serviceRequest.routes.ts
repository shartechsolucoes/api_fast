import { FastifyInstance } from 'fastify';
import { ServiceRequestController } from '../controllers/serviceRequest.controllers';

export default async function serviceRequestRoutes(server: FastifyInstance) {
	server.post('/service-request', ServiceRequestController.create);
	server.get('/service-request', ServiceRequestController.findAll);
	server.get('/service-request/:id', ServiceRequestController.findOne);
	server.put('/service-request/:id', ServiceRequestController.update);
	server.delete('/service-request/:id', ServiceRequestController.remove);
}
