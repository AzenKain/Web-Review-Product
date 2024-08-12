import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: string;

    @Column({ unique: true })
    email: string;
    @Column({ unique: true })
    secretKey: string;
    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    hash: string;

    @Column()
    refreshToken: string;

    @CreateDateColumn()
    created_at: Date;
        
    @UpdateDateColumn()
    updated_at: Date;
}