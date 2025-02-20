import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { CoreModule } from '@core/core';

@Module({
  imports: [CoreModule],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
