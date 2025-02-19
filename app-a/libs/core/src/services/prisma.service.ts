import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@shared/prisma-client/src/generated';

@Injectable()
export class PrismaService extends PrismaClient {}
