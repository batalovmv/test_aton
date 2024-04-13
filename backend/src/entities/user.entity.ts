import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import bcrypt from 'bcryptjs';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    fullName!: string;

    @Column()
    login!: string;

    @Column()
    password!: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}