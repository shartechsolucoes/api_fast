import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './User';
import { Material } from './Material';

@Entity()
export class Company {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	corporateName: string;

	@Column()
	tradeName: string;

	@Column()
	cnpj: string;

	@Column()
	stateRegistration: string;

	@Column()
	type: string;

	@Column()
	responsibleName: string;

	@Column()
	responsibleCpf: string;

	@Column()
	email: string;

	@Column()
	phone: string;

	@Column()
	website: string;

	@Column()
	street: string;

	@Column()
	number: string;

	@Column()
	complement: string;

	@Column()
	neighborhood: string;

	@Column()
	zipCode: string;

	@Column()
	city: string;

	@Column()
	state: string;

	@OneToMany(() => User, (user) => user.company)
	users: User[];

	@OneToMany(() => Material, (material) => material.company)
	materials: Material[];
}
