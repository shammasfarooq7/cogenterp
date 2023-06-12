import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

export enum UserRole {
  RMS = 'rms',
  SD = 'sd',
  RESOURCE = 'resource',
  FEOPS = 'feops',
  ADMIN = 'admin',
  CUSTOMER = 'customer',
}
registerEnumType(UserRole, {
  name: 'userRoles',
  description: 'The user role assigned',
});

@Entity({ name: 'roles' })
@ObjectType()
export class Role {
  @PrimaryGeneratedColumn('increment')
  @Field()
  id: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.RESOURCE,
  })
  @Field(() => UserRole)
  role: UserRole;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];

  @CreateDateColumn({ type: 'timestamptz' })
  @Field()
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field()
  updatedAt: string;
}
