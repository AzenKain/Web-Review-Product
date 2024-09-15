import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/types/user';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos';
import * as argon from 'argon2';
import { v5 as uuidv5 } from 'uuid';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
    constructor(
        private jwt: JwtService,
        private config: ConfigService,
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,

    ) { }
    private CheckRoleUser(user: UserEntity) {
        if (!user.role.includes("ADMIN") && !user.role.includes("HUMMANRESOURCE")) {
            throw new ForbiddenException('The user does not have permission');
        }
    }
    
    async CreateUserByListService(dto: CreateUserDto[], userCurrent: UserEntity) {
        const dataReturn : UserEntity[] = []
        for (const user of dto) {
            dataReturn.push(await this.CreateUserService(user, userCurrent))
        }
        return dataReturn
    }

    async CreateUserService(dto: CreateUserDto, userCurrent: UserEntity): Promise<UserEntity> {
        this.CheckRoleUser(userCurrent)

        const checkMail = await this.userRepository.findOne({
            where: {
                email: dto.email,
            }
        })

        if (checkMail != null) {
            throw new ForbiddenException(
                'This email was existed before',
            );
        }

        const hash = await argon.hash(dto.password);

        const UserCre = this.userRepository.create({
            secretKey: uuidv5(dto.email, uuidv5.URL),
            email: dto.email,
            hash: hash,
            refreshToken: uuidv4(),
            details: {
                firstName: dto.firstName,
                lastName: dto.lastName
            },
            actionLog: [],
            role: [],
            username: dto.username
        })

        return await this.userRepository.save(UserCre);
    }


    async GetUserByIdService(userId: string, userCurrent: UserEntity): Promise<UserEntity> {
        if (!userCurrent.role.includes("ADMIN") && !(userCurrent.secretKey == userId) && !userCurrent.role.includes("HUMMANRESOURCE")) {
            throw new ForbiddenException('The user does not have permission');
        }

        const user = await this.userRepository.findOne({
            where: {
                secretKey: userId,
                isDisplay: true
            }
        });

        if (!user) {
            throw new NotFoundException("The user does not exist!")
        }

        delete user.hash;
        delete user.refreshToken;
        return user;
    }
}
