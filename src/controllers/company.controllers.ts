import { AppDataSource } from '../data-source';
import { Company } from '../entity/Company';
import { User } from '../entity/User';

export class CompanyController {
	private companyRepo = AppDataSource.getRepository(Company);
	private userRepo = AppDataSource.getRepository(User);

	async createCompany(companyData: Partial<Company>) {
		const company = this.companyRepo.create(companyData);
		await this.companyRepo.save(company);
		return company;
	}

	async getAllCompanies() {
		return await this.companyRepo.find({ relations: ['users'] });
	}

	async getCompanyById(id: string) {
		return await this.companyRepo.findOne({
			where: { id },
			relations: ['users'],
		});
	}

	async addUserToCompany(companyId: string, userData: Partial<User>) {
		const company = await this.companyRepo.findOne({
			where: { id: companyId },
			relations: ['users'],
		});
		if (!company) return { error: 404, message: 'Company not found' };

		if (userData.isAdmin) {
			const adminExists = company.users?.some((u) => u.isAdmin);
			if (adminExists) {
				return { error: 400, message: 'Company already has an admin' };
			}
		}
		const user = this.userRepo.create({ ...userData, company });
		await this.userRepo.save(user);
		return user;
	}
}
