import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "./../../../users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Resource } from "./../../resources/entity/resource.entity";

@Entity({ name: 'user_payment_methods' })
@ObjectType()
export class UserPaymentMethod {
    @PrimaryGeneratedColumn('increment')
    @Field()
    id: string;

    @Column()
    @Field(() => String)
    accountType: string;

    @Column()
    @Field(() => String)
    accountTitle: string;

    @Column()
    @Field(() => String)
    beneficiaryFirstName: string;

    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    beneficiaryMiddleName: string;

    @Column()
    @Field(() => String)
    beneficiaryLastName: string;

    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    beneficiaryAddress: string;

    @Column({ nullable: true })
    @Field({ nullable: true })
    sortCode: string;

    @Column()
    @Field(() => String)
    accountNumber: string;

    @Column()
    @Field(() => String)
    iban: string;

    @Column()
    @Field(() => String)
    swiftCode: string;

    @Column()
    @Field(() => String)
    bankName: string;

    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    branchName: string;

    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    bankAddress: string;

    @Field(() => Resource,)
    @ManyToOne(() => Resource, (resource) => resource.userPaymentMethod)
    @JoinColumn({ name: "resourceId" })
    resource: Resource

    @Column({ type: "uuid", nullable: true })
    @Field({ nullable: true })
    userId: string

    @CreateDateColumn({ type: 'timestamptz' })
    @Field()
    createdAt: string;

    @UpdateDateColumn({ type: 'timestamptz' })
    @Field()
    updatedAt: string;
}
