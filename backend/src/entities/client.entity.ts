import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity()
export class Client  {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    accountNumber!: string;

    @Column()
    lastName!: string;

    @Column()
    firstName!: string;

    @Column()
    middleName!: string;

    @Column()
    birthDate!: Date;

    @Column()
    taxNumber!: string;

    @Column()
    responsiblePerson!: string;

    @Column({ default: 'Не в работе' })
    status!: string;
}