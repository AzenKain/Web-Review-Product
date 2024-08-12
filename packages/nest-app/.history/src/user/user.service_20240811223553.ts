import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor(
        private jwt: JwtService,
        private config: ConfigService,
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(CommitEntity) private commitRepository: Repository<CommitEntity>,
        @InjectRepository(OtpCode) private otpCodeRepository: Repository<OtpCode>,
        private readonly mailerService: MailerService
    ) { }

}
