import { Module } from '@nestjs/common';
import { DocumentService } from './services/document.service';
import { DocumentRepository } from './repositories/document.repository';
import { CoreModule } from '@core/core';
import { DocumentController } from './controllers/document.controller';

@Module({
  imports: [CoreModule],
  providers: [DocumentRepository, DocumentService],
  controllers: [DocumentController],
  exports: [DocumentService],
})
export class DocumentModule {}
