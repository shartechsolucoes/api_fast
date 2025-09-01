import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Company } from './Company';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ length: 50 })
	fullName: string;

	@Column({ length: 15 })
	phone: string;

	@Column({ length: 50 })
	email: string;

	@Column({ length: 100 })
	password: string;

	@Column({ length: 10 })
	howDidYouFindUs: string;

	@Column({ default: false })
	isAdmin: boolean;

	@ManyToOne(() => Company, (company) => company.users)
	company: Company;
}
