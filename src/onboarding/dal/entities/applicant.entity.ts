import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Applicant {
    @PrimaryGeneratedColumn()
    applicantId: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    emailAddress: string;

    @Column()
    createdAt: Date;
}