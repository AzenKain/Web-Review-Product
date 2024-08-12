import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    private jwt: JwtService,
    private config: ConfigService,
    @InjectRepository(User) private userRespository: Repository<User>,
}
