import { DocumentModule } from '@document/document';
import { Module } from '@nestjs/common';
import { AuthModule } from '@auth/auth';

@Module({
  imports: [DocumentModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
