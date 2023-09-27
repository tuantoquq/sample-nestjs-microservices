import { Injectable } from '@nestjs/common';
import { UserDocument } from './users/models/users.schema';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ITokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async login(user: UserDocument, response: Response) {
    const tokenPayload: ITokenPayload = {
      sub: user._id.toHexString(),
    };

    const expire = new Date();
    expire.setSeconds(
      expire.getSeconds() +
        parseInt(this.configService.get('JWT_EXPIRATION_TIME')),
    );

    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires: expire,
    });
  }
}
