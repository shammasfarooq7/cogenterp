
import { ObjectType, Field } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn, } from 'typeorm';
import { Role } from './role.entity';
import { LoginTracker } from './loginTracker.entity'
import { Resource, } from './../../modules/resources/entity/resource.entity';
import { Customer } from '../../modules/customer/entities/customer.entity';

@ObjectType()
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  @Field(() => String)
  id: string;

  @Column('varchar', { length: 50, unique: true })
  @Field(() => String)
  email: string;

  @Column('varchar', { length: 100 })
  password: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  middleName: string;

  @OneToMany(() => Resource, resource => resource.onboardedBy, { nullable: true })
  @JoinColumn({ name: 'onboardedResources' })
  @Field(() => [Resource], { nullable: true })
  onboardedResources: Resource[];

  @OneToMany(() => Customer, customer => customer.onboardedBy, { nullable: true })
  @JoinColumn({ name: 'onboardedCustomers' })
  @Field(() => [Customer], { nullable: true })
  onboardedCustomers: Customer[];

  @Field(() => [Role])
  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({ name: "user_roles" })
  roles: Role[];

  @OneToOne(() => LoginTracker, {
    onDelete: 'CASCADE',
    nullable: true
  })
  @JoinColumn({ name: 'loginTrackerId' })
  loginTracker: LoginTracker;

  @Field(() => Resource, { nullable: true })
  @OneToOne(() => Resource, resource => resource.user, { nullable: true, onDelete: "CASCADE" })
  @JoinColumn({ name: 'resourceId' })
  resource: Resource;

  @Field(() => Customer, { nullable: true })
  @OneToOne(() => Customer, customer => customer.user, { nullable: true, onDelete: "CASCADE" })
  customer: Customer;

  @CreateDateColumn({ type: 'timestamptz' })
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Field(() => Date)
  updatedAt: Date;

  @Column({ nullable: true, type: 'timestamptz' })
  @Field(() => Date, { nullable: true })
  deletedAt: Date;

}


// Email, Password, roles, Logintracker, createdAt, updatedAt, deletedAt, onboardedUsers,resource