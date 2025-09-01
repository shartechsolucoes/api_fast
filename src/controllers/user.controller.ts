import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import bcrypt from 'bcryptjs';

export class UserController {
	private userRepository = AppDataSource.getRepository(User);

	async getAll() {
		return await this.userRepository.find();
	}

	async getById(id: string) {
		return await this.userRepository.findOneBy({ id });
	}

	async create(userData: Partial<User>) {
		const hashedPassword = await bcrypt.hash(userData.password, 10);
		const user = this.userRepository.create({
			...userData,
			password: hashedPassword, // Salva o hash da senha
		});
		return await this.userRepository.save(user);
	}

	async update(id: string, userData: Partial<User>) {
		const user = await this.userRepository.findOneBy({ id });
		if (!user) return null;
		this.userRepository.merge(user, userData);
		return await this.userRepository.save(user);
	}

	async delete(id: string) {
		const user = await this.userRepository.findOneBy({ id });
		if (!user) return null;
		await this.userRepository.remove(user);
		return user;
	}
}
