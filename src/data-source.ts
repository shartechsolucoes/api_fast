import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
	type: 'mysql',
	host: 'localhost',
	port: 3306,
	username: 'root',
	password: 'admin',
	database: 'fastmanager',
	synchronize: true,
	// dropSchema: true,
	logging: false,
	entities: ['./src/entity/**/*.ts'],
	migrations: ['./src/migrations/**/*.ts'],
	subscribers: [],
});
