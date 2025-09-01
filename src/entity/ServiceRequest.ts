import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class ServiceRequest {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cpf: string;

    @Column()
    nome: string;

    @Column()
    telefone: string;

    @Column()
    email: string;

    @Column()
    tipoServico: string;

    @Column()
    descricaoServico: string;

    @Column()
    cep: string;

    @Column()
    endereco: string;

    @Column()
    numero: string;

    @Column()
    bairro: string;

    @Column()
    cidade: string;

    @Column()
    estado: string;

    @Column({ nullable: true })
    referencia: string;

    @CreateDateColumn()
    createdAt: Date;
}