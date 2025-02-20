import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserModule } from '@user/user';
import { AuthController } from './controllers/user.controller';

@Module({
  imports: [UserModule],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
