import { PrismaService } from '@core/core/services/prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '@shared/prisma-client';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { username } });
  }
}
