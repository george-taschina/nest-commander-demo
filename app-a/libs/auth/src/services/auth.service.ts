import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@user/user/services/user.service';
import { JwtPayloadDto } from '../documents/dto/jwt-payload.dto';
import { User } from '@shared/prisma-client';
import { compareSync } from 'bcrypt-ts';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findByUsername(username);

    if (user === null || !compareSync(pass, user.password)) {
      throw new UnauthorizedException();
    }

    return {
      access_token: await this.jwtService.signAsync(
        this.createUserPayload(user),
      ),
    };
  }

  private createUserPayload(user: User): JwtPayloadDto {
    return { sub: user.id, username: user.username };
  }
}
