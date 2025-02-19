import { Injectable } from '@nestjs/common';
import { DocumentRepository } from '../repositories/document.repository';
import { Document } from '@shared/prisma-client';

@Injectable()
export class DocumentService {
  constructor(private readonly documentRepository: DocumentRepository) {}

  async findAll(): Promise<Document[]> {
    return this.documentRepository.findAll();
  }
}
