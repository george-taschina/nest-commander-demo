import { throwIfNull } from '@core/core/utils/throw-if-null';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@shared/prisma-client';
import { UserService } from '@user/user/services/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async signIn(username: string, pass: string): Promise<User> {
    const user = throwIfNull(
      await this.usersService.findByUsername(username),
      'No user with this username available.',
    );

    if (user.password !== pass) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
