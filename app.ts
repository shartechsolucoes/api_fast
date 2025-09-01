import fastify from 'fastify';
import pingRoutes from './src/routes/ping.route';
import userRoutes from './src/routes/user.route';
import { AppDataSource } from './src/data-source';
import 'reflect-metadata';
import jwtPlugin from './src/plugins/jwt';
import authRoutes from './src/routes/login.route';
import companyRoutes from './src/routes/company.route';
import materialRoutes from './src/routes/material.route';
import serviceRequestRoutes from './src/routes/serviceRequest.routes';

const server = fastify();

AppDataSource.initialize()
	.then(async () => {
		await server.register(jwtPlugin);
		authRoutes(server);
		pingRoutes(server);
		userRoutes(server);
		companyRoutes(server);
		materialRoutes(server);
		serviceRequestRoutes(server);

		server.listen({ port: 8080 }, (err, address) => {
			if (err) {
				console.error(err);
				process.exit(1);
			}
			console.log(`Server listening at ${address}`);
		});
	})
	.catch((error) => {
		console.error('Error during Data Source initialization:', error);
	});
