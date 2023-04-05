import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "./../../../users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, JoinColumn } from "typeorm";

// @Entity({ name: 'user_roles' })
@ObjectType()
export class UserRole {
    // @PrimaryGeneratedColumn('uuid')
    // @Field()
    // id: string;

    // @Column({
    //     type: 'uuid',
    // })
    // @Field(() => String)
    // usersId: string;

    // @Column({
    //     type: 'uuid',
    // })
    // @Field(() => String)
    // rolesId: string;

    // @CreateDateColumn({ type: 'timestamptz' })
    // @Field()
    // createdAt: string;

    // @UpdateDateColumn({ type: 'timestamptz' })
    // @Field()
    // updatedAt: string;
}
