/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthGuard } from '@auth/auth/guards/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { DocumentController } from '@document/document/controllers/document.controller';
import { DocumentService } from '@document/document/services/document.service';
import { PrismaService } from '@core/core/services/prisma.service';
import { CreateDocumentDto } from '@document/document/documents/dto/create-document.dto';
import { UpdateDocumentDto } from '@document/document/documents/dto/update-document.dto';

describe('DocumentController (integration)', () => {
  let app: INestApplication;
  let documentService: DocumentService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [DocumentController],
      providers: [
        DocumentService,
        PrismaService,
        { provide: AuthGuard, useValue: { canActivate: jest.fn(() => true) } },
        { provide: JwtService, useValue: {} },
        { provide: ConfigService, useValue: {} },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    documentService = moduleFixture.get<DocumentService>(DocumentService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/GET documents', () => {
    it('should return an array of documents', async () => {
      const result = [
        {
          id: 1,
          content: 'test',
          owner: 'owner',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest.spyOn(documentService, 'findAll').mockResolvedValue(result);

      const response = await request(app.getHttpServer()).get('/documents');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(result);
    });
  });

  describe('/GET documents/:id', () => {
    it('should return a single document', async () => {
      const result = {
        id: 1,
        content: 'test',
        owner: 'owner',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(documentService, 'findOne').mockResolvedValue(result);

      const response = await request(app.getHttpServer()).get('/documents/1');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(result);
    });

    it('should return 404 if document not found', async () => {
      jest.spyOn(documentService, 'findOne').mockResolvedValue(null);

      const response = await request(app.getHttpServer()).get('/documents/1');
      expect(response.status).toBe(404);
    });
  });

  describe('/POST documents', () => {
    it('should create and return a document', async () => {
      const dto: CreateDocumentDto = { content: 'test', owner: 'owner' };
      const result = {
        id: 1,
        content: dto.content,
        owner: dto.owner,
        createdAt: new Date(),
      };
      jest.spyOn(documentService, 'create').mockResolvedValue(result);

      const response = await request(app.getHttpServer())
        .post('/documents')
        .send(dto);
      expect(response.status).toBe(201);
      expect(response.body).toEqual(result);
    });
  });

  describe('/PATCH documents/:id', () => {
    it('should update and return a document', async () => {
      const dto: UpdateDocumentDto = { content: 'updated', owner: 'owner' };
      const result = {
        id: 1,
        content: dto.content!,
        owner: dto.owner!,
        createdAt: new Date(),
      };
      jest.spyOn(documentService, 'update').mockResolvedValue(result);

      const response = await request(app.getHttpServer())
        .patch('/documents/1')
        .send(dto);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(result);
    });
  });

  describe('/DELETE documents/:id', () => {
    it('should delete and return a document', async () => {
      const result = {
        id: 1,
        content: 'test',
        owner: 'owner',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(documentService, 'delete').mockResolvedValue(result);

      const response = await request(app.getHttpServer()).delete(
        '/documents/1',
      );
      expect(response.status).toBe(200);
      expect(response.body).toEqual(result);
    });
  });
});
