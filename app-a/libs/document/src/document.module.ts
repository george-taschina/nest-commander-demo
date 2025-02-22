import { Module } from '@nestjs/common';
import { DocumentService } from './services/document.service';
import { DocumentRepository } from './repositories/document.repository';
import { CoreModule } from '@core/core';
import { DocumentController } from './controllers/document.controller';
import { AuthModule } from '@auth/auth';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [CoreModule, AuthModule],
  providers: [DocumentRepository, DocumentService, JwtService],
  controllers: [DocumentController],
  exports: [DocumentService],
})
export class DocumentModule {}
