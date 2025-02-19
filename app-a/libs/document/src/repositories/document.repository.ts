import { PrismaService } from '@core/core/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { Document } from '@shared/prisma-client';

@Injectable()
export class DocumentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Document[]> {
    return await this.prisma.document.findMany();
  }
}
