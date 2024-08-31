import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from 'src/types/order';
import { UserEntity } from 'src/types/user';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
    constructor(
        private config: ConfigService,
        @InjectRepository(OrderEntity) private orderRepository: Repository<OrderEntity>,
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    ) { }
}
