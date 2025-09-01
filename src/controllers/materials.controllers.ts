import { AppDataSource } from '../data-source';
import { Material } from '../entity/Material';
import { Company } from '../entity/Company';

export class MaterialController {
	private materialRepo = AppDataSource.getRepository(Material);
	private companyRepo = AppDataSource.getRepository(Company);

	async getAll() {
		return await this.materialRepo.find();
	}

	async getById(id: string) {
		return await this.materialRepo.findOneBy({ id });
	}

	async create(materialData: Partial<Material> & { companyId: string }) {
		const company = await this.companyRepo.findOneBy({
			id: materialData.companyId,
		});
		if (!company) return { error: 404, message: 'Company not found' };

		const material = this.materialRepo.create({
			...materialData,
			company,
		});
		return await this.materialRepo.save(material);
	}

	async update(id: string, materialData: Partial<Material>) {
		const material = await this.materialRepo.findOneBy({ id });
		if (!material) return null;
		this.materialRepo.merge(material, materialData);
		return await this.materialRepo.save(material);
	}

	async delete(id: string) {
		const material = await this.materialRepo.findOneBy({ id });
		if (!material) return null;
		return await this.materialRepo.remove(material);
	}
}
