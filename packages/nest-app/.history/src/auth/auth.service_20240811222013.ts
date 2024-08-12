import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/types/user';
import { Repository } from 'typeorm';
import { LoginDto } from './dto';
import * as argon from 'argon2';
import { v5 as uuidv5 } from 'uuid';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
    constructor(
        private jwt: JwtService,
        private config: ConfigService,
        @InjectRepository(User) private userRespository: Repository<User>,
       
    ) { }
    async Login(userDto: LoginDto) {
        const userLogin = await this.userRespository.findOne({
            where: {
                email: userDto.email
            }
        });
        if (!userLogin)
            throw new ForbiddenException(
                'This user does not exist',
            );

        const pwMatches = await argon.verify(
            userLogin.hash,
            userDto.password,
        );

        if (!pwMatches)
            throw new ForbiddenException(
                'Wrong password',
            );
        const token = await this.signToken(userLogin.id, userLogin.email)
        await this.updateRefreshToken(userLogin.id, token.refresh_token)
        return token;
    }
    async Signup(userDto: SignUpDto) {
        const valueGender = ["male", "female", "other"];
        if (userDto.gender != null && !valueGender.includes(userDto.gender)) {
            throw new ForbiddenException(
                'Gender is not validate',
            );
        }
        if (userDto.countryCode != null && !userDto.countryCode.startsWith("+")) {
            throw new ForbiddenException(
                'CountryCode is not validate',
            );
        }
        const checkMail = await this.userRespository.findOne({
            where: {
                email: userDto.email,
            }
        })

        if (checkMail != null) {
            throw new ForbiddenException(
                'This email was existed before',
            );
        }
        const dataOtp = await this.otpCodeRepository.findOne({
            where: {
                id: userDto.otpId,
                email: userDto.email,
                type: "SignUp"
            }
        })

        if (!dataOtp) {
            throw new ForbiddenException(
                'The user have not OTP CODE',
            );
        }
        const hash = await argon.hash(userDto.password);



        const UserCre = this.userRespository.create({
            id: uuidv5(userDto.email, uuidv5.URL),
            email: userDto.email,
            hash,
            refreshToken: uuidv4(),
            firstName: dt
        })

        const newUser = await this.userRespository.save(UserCre);
        const token = await this.signToken(newUser.id, newUser.email)
        await this.updateRefreshToken(newUser.id, token.refresh_token)
        return token;
    }
    async signToken(
        id: string,
        email: string,
    ): Promise<{ access_token: string, refresh_token: string }> {

        const accessToken = await this.jwt.signAsync(
            {
                id: id,
                email,
            },
            {
                expiresIn: '15m',
                secret: this.config.get('JWT_SECRET'),
            },
        );

        const refreshToken = await this.jwt.signAsync(
            {
                id: id,
                email,
            },
            {
                expiresIn: '15d',
                secret: this.config.get('JWT_REFRESH_SECRET'),
            },
        );
        return {
            access_token: accessToken,
            refresh_token: refreshToken
        };
    }

    async updateRefreshToken(userId: string, refreshToken: string) {
        const user  = await this.userRespository.findOne({
            where: {
                id: userId,
            }
        })
        user.refreshToken = refreshToken
        await this.userRespository.save({...user});
    }

}
