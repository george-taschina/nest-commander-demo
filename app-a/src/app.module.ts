import { DocumentModule } from '@document/document';
import { Module } from '@nestjs/common';
import { AuthModule } from '@auth/auth';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DocumentModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
