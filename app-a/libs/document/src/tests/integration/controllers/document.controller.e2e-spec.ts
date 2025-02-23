/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/require-await */
import { Test, TestingModule } from '@nestjs/testing';
import { CanActivate, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Document } from '@shared/prisma-client';
import { DocumentModule } from '@document/document/document.module';
import { CreateDocumentDto } from '@document/document/documents/dto/create-document.dto';
import { UpdateDocumentDto } from '@document/document/documents/dto/update-document.dto';
import { AuthGuard } from '@auth/auth/guards/auth.guard';

jest.mock('bcrypt-ts', () => ({
  compareSync: jest.fn().mockReturnValue(true),
}));

describe('DocumentController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const mockGuard: CanActivate = {
      canActivate: jest.fn(() => true),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DocumentModule],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockGuard)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /documents', () => {
    it('should return an array of documents', async () => {
      const result: Document[] = [
        {
          id: 1,
          content: 'This is a test document',
          owner: 'test',
          createdAt: new Date(),
        },
      ];

      return request(app.getHttpServer())
        .get('/documents')
        .expect(200)
        .expect(result);
    });
  });

  describe('GET /documents/:id', () => {
    it('should return a single document', async () => {
      const result: Document = {
        id: 1,
        content: 'This is a test document',
        owner: 'test',
        createdAt: new Date(),
      };

      return request(app.getHttpServer())
        .get('/documents/1')
        .expect(200)
        .expect(result);
    });

    it('should return 404 if document is not found', async () => {
      return request(app.getHttpServer()).get('/documents/999').expect(404);
    });
  });

  describe('POST /documents', () => {
    it('should create a new document', async () => {
      const createDocumentDto: CreateDocumentDto = {
        owner: 'test',
        content: 'This is a new document',
      };
      const result: Document = {
        id: 1,
        ...createDocumentDto,
        createdAt: new Date(),
      };

      return request(app.getHttpServer())
        .post('/documents')
        .send(createDocumentDto)
        .expect(201)
        .expect(result);
    });
  });

  describe('PATCH /documents/:id', () => {
    it('should update a document', async () => {
      const updateDocumentDto: UpdateDocumentDto = {
        owner: 'test',
        content: 'This is an updated document',
      };
      const result: Document = {
        id: 1,
        content: updateDocumentDto.content!,
        owner: updateDocumentDto.owner!,
        createdAt: new Date(),
      };

      return request(app.getHttpServer())
        .patch('/documents/1')
        .send(updateDocumentDto)
        .expect(200)
        .expect(result);
    });
  });

  describe('DELETE /documents/:id', () => {
    it('should delete a document', async () => {
      const result: Document = {
        id: 1,
        owner: 'test',
        content: 'This is a test document',
        createdAt: new Date(),
      };

      return request(app.getHttpServer())
        .delete('/documents/1')
        .expect(200)
        .expect(result);
    });
  });
});
