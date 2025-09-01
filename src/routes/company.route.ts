import { FastifyInstance } from 'fastify';
import { CompanyController } from '../controllers/company.controllers';

const companyController = new CompanyController();

export default async function companyRoutes(server: FastifyInstance) {
	// Create company
	server.post('/companies', async (request, reply) => {
		const company = await companyController.createCompany(request.body);
		return company;
	});

	// Get all companies
	server.get('/companies', async () => {
		return await companyController.getAllCompanies();
	});

	// Get company by id
	server.get('/companies/:id', async (request) => {
		const { id } = request.params as { id: string };
		return await companyController.getCompanyById(id);
	});

	// Add user to company (with admin check)
	server.post('/companies/:id/users', async (request, reply) => {
		const { id } = request.params as { id: string };
		const result = await companyController.addUserToCompany(id, request.body);
		if ('error' in result) {
			return reply.code(result.error).send({ message: result.message });
		}
		return result;
	});
}
