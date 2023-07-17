import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPaymentMethod } from './entity/userPaymentMethod.entity';

@Injectable()
export class UserPaymentMethodsService {
    constructor(@InjectRepository(UserPaymentMethod) private userPaymentMethodRepo: Repository<UserPaymentMethod>,) { }

    async getAllUserPaymentMethods(): Promise<UserPaymentMethod[]> {
        try {
            return await this.userPaymentMethodRepo.find({ relations: { resource: true } });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

}
