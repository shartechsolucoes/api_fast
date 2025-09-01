import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Company } from './Company';


@Entity()
export class Material {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	unit: string;

	@Column()
	type: string;

	@Column({ nullable: true })
	notes: string;

	@ManyToOne(() => Company, (company) => company.materials)
	company: Company;
}
