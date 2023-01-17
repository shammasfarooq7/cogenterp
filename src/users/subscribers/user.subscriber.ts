import { EntitySubscriberInterface, EventSubscriber, InsertEvent, DataSource, UpdateEvent } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(private readonly connection: DataSource) {
    this.connection.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  async beforeInsert(event: InsertEvent<User>): Promise<void> {
    event.entity.password = await bcrypt.hash(event.entity.password, await bcrypt.genSalt());
  }

  async beforeUpdate(event: UpdateEvent<User>): Promise<any> {
    if (event.entity.password && !this.isPasswordEncoded(event.entity.password)) {
      event.entity.password = await bcrypt.hash(event.entity.password, await bcrypt.genSalt());
    }
  }

  private isPasswordEncoded(password: string): boolean {
    return password.length >= 60;
  }
}
