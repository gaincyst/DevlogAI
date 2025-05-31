import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies?.['auth-token'],
      ]),
      ignoreExpiration: false,
      secretOrKey: 'ieuf!!gr&^*VWDB;13t489gufb=-][;nvw',
    });
  }

  async validate(payload: any) {
    console.log('JWT payload:', payload);
    return {
      uuid: payload.uuid,
      email: payload.email,
      first_name: payload.first_name,
      last_name: payload.last_name,
    };
  }
}
