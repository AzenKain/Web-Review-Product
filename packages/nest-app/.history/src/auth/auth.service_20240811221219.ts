import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/types/user';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    private jwt: JwtService,
    private config: ConfigService,
    @InjectRepository(User) private userRespository: Repository<User>,
}
