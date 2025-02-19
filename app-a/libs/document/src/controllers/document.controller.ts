import { Controller, Get } from '@nestjs/common';
import { DocumentService } from '../services/document.service';
import { Document } from '@shared/prisma-client';

@Controller('documents')
export class DocumentController {
  constructor(private documentService: DocumentService) {}

  @Get()
  async findAll(): Promise<Document[]> {
    return await this.documentService.findAll();
  }
}
