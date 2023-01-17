import { EntitySubscriberInterface, InsertEvent, DataSource, UpdateEvent } from 'typeorm';
import { User } from '../entities/user.entity';
export declare class UserSubscriber implements EntitySubscriberInterface<User> {
    private readonly connection;
    constructor(connection: DataSource);
    listenTo(): typeof User;
    beforeInsert(event: InsertEvent<User>): Promise<void>;
    beforeUpdate(event: UpdateEvent<User>): Promise<any>;
    private isPasswordEncoded;
}
