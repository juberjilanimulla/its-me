import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    firstName: string;
    
    @Column({ type: 'varchar', length: 255 })
    middleName: string;

    @Column({ type: 'varchar', length: 255 })
    lastName: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email!: string;

    @Column({type:'varchar',length:255})
    password!: string;

    @Column({type:'boolean',default:false})
    isActive!: boolean;

    @Column({ type: 'varchar', nullable: true, length: 255 })
    mobile?: string;
   
    @Column({type:'tinyint',default:0})
     mail_verified!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}