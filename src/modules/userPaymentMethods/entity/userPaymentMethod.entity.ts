import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "./../../../users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @Column()
    @Field(() => String)
    beneficiaryMiddleName: string;

    @Column()
    @Field(() => String)
    beneficiaryLastName: string;

    @Column()
    @Field(() => String)
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

    @Column()
    @Field(() => String)
    branchName: string;

    @Column()
    @Field(() => String)
    bankAddress: string;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.userPaymentMethod)
    @JoinColumn({ name: "userId" })
    user: User

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
