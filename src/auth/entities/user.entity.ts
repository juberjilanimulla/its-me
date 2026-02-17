import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity("users")
export class User{
    @PrimaryGeneratedColumn()
    id: number;


@Column({type:'varchar',length:255})
name:string;

@Column({type:'varchar',length:255,unique:true})
email:string;

@Column({type:'varchar',length:255})
password:string;

@Column({type:'varchar',length:255})
role:string;

@Column({type:'varchar',length:255})
bio:string;

@Column({type:'boolean',default:false})
isActive:Boolean;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  phoneNumber: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}