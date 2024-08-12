import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    private jwt: JwtService,
    private config: ConfigService,
    @InjectRepository(User) private userRespository: Repository<User>,
}
