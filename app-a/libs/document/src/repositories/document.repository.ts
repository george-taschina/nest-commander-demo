import { PrismaService } from '@core/core/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { Document } from '@shared/prisma-client';
import { CreateDocumentDto } from '../documents/dto/create-document.dto';
import { UpdateDocumentDto } from '../documents/dto/update-document.dto';

@Injectable()
export class DocumentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Document[]> {
    return await this.prisma.document.findMany();
  }

  async findOne(id: number): Promise<Document | null> {
    return await this.prisma.document.findUnique({ where: { id } });
  }

  async create(data: CreateDocumentDto): Promise<Document> {
    return await this.prisma.document.create({ data });
  }

  async update(id: number, data: UpdateDocumentDto): Promise<Document> {
    return await this.prisma.document.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Document> {
    return await this.prisma.document.delete({ where: { id } });
  }
}
