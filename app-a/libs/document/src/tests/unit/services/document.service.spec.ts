import { CreateDocumentDto } from '@document/document/documents/dto/create-document.dto';
import { UpdateDocumentDto } from '@document/document/documents/dto/update-document.dto';
import { DocumentRepository } from '@document/document/repositories/document.repository';
import { DocumentService } from '@document/document/services/document.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Document } from '@shared/prisma-client';

const mockDocumentRepository = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('DocumentService', () => {
  let service: DocumentService;
  let repository: DocumentRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentService,
        { provide: DocumentRepository, useValue: mockDocumentRepository },
      ],
    }).compile();

    service = module.get<DocumentService>(DocumentService);
    repository = module.get<DocumentRepository>(DocumentRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of documents', async () => {
      const result: Document[] = [
        { id: 1, content: 'test', owner: 'owner', createdAt: new Date() },
      ];
      jest.spyOn(repository, 'findAll').mockResolvedValue(result);

      expect(await service.findAll()).toBe(result);
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
      jest.spyOn(repository, 'findOne').mockResolvedValue(result);

      expect(await service.findOne(1)).toBe(result);
    });

    it('should return null if document not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      expect(await service.findOne(1)).toBeNull();
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
      jest.spyOn(repository, 'create').mockResolvedValue(result);

      expect(await service.create(dto)).toBe(result);
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
      jest.spyOn(repository, 'update').mockResolvedValue(result);

      expect(await service.update(1, dto)).toBe(result);
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
      jest.spyOn(repository, 'delete').mockResolvedValue(result);

      expect(await service.delete(1)).toBe(result);
    });
  });
});
