import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentRepository } from '../repositories/document.repository';
import { Document } from '@shared/prisma-client';
import { CreateDocumentDto } from '../documents/dto/create-document.dto';
import { UpdateDocumentDto } from '../documents/dto/update-document.dto';

@Injectable()
export class DocumentService {
  constructor(private readonly documentRepository: DocumentRepository) {}

  async findAll(): Promise<Document[]> {
    return this.documentRepository.findAll();
  }

  async findOne(id: number): Promise<Document | null> {
    return this.documentRepository.findOne(id);
  }

  async create(data: CreateDocumentDto): Promise<Document> {
    return this.documentRepository.create(data);
  }

  async update(id: number, data: UpdateDocumentDto): Promise<Document> {
    const exists = await this.findOne(id);

    if (!exists) {
      throw new NotFoundException(
        'Could not update record, because it does not exist',
      );
    }
    return this.documentRepository.update(id, data);
  }

  async delete(id: number): Promise<Document> {
    const exists = await this.findOne(id);

    if (!exists) {
      throw new NotFoundException(
        'Could not delete record, because it does not exist',
      );
    }
    return this.documentRepository.delete(id);
  }
}
