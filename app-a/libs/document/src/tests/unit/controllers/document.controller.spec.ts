import { DocumentController } from '@document/document/controllers/document.controller';
import { CreateDocumentDto } from '@document/document/documents/dto/create-document.dto';
import { UpdateDocumentDto } from '@document/document/documents/dto/update-document.dto';
import { DocumentService } from '@document/document/services/document.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Document } from '@shared/prisma-client';
import { AuthGuard } from '@auth/auth/guards/auth.guard';
import { ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

const mockDocumentService = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const mockAuthGuard = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canActivate: jest.fn((context: ExecutionContext) => true),
};

const mockJwtService = {
  verify: jest.fn(),
};

const mockConfigService = {
  get: jest.fn(),
};

describe('DocumentController', () => {
  let controller: DocumentController;
  let service: DocumentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentController],
      providers: [
        { provide: DocumentService, useValue: mockDocumentService },
        { provide: AuthGuard, useValue: mockAuthGuard },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    controller = module.get<DocumentController>(DocumentController);
    service = module.get<DocumentService>(DocumentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of documents', async () => {
      const result: Document[] = [
        {
          id: 1,
          content: 'test',
          owner: 'owner',
          createdAt: new Date(),
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single document', async () => {
      const result: Document = {
        id: 1,
        content: 'test',
        owner: 'owner',
        createdAt: new Date(),
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(1)).toBe(result);
    });

    it('should throw an error if document not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      await expect(controller.findOne(1)).rejects.toThrow(
        'Could not find this document',
      );
    });
  });

  describe('create', () => {
    it('should create and return a document', async () => {
      const dto: CreateDocumentDto = { content: 'test', owner: 'owner' };
      const result: Document = {
        id: 1,
        createdAt: new Date(),
        content: dto.content,
        owner: dto.owner,
      };
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(dto)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update and return a document', async () => {
      const dto: UpdateDocumentDto = { content: 'updated', owner: 'owner' };
      const result: Document = {
        id: 1,
        createdAt: new Date(),
        content: dto.content!,
        owner: dto.owner!,
      };
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(1, dto)).toBe(result);
    });
  });

  describe('delete', () => {
    it('should delete and return a document', async () => {
      const result: Document = {
        id: 1,
        content: 'test',
        owner: 'owner',
        createdAt: new Date(),
      };
      jest.spyOn(service, 'delete').mockResolvedValue(result);

      expect(await controller.delete(1)).toBe(result);
    });
  });
});
