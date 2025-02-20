import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { DocumentService } from '../services/document.service';
import { Document } from '@shared/prisma-client';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { CreateDocumentDto } from '../documents/dto/create-document.dto';
import { UpdateDocumentDto } from '../documents/dto/update-document.dto';
import { throwIfNull } from '../../../core/src/utils/throw-if-null';

@ApiTags('Documents')
@Controller('documents')
export class DocumentController {
  constructor(private documentService: DocumentService) {}

  @Get()
  @ApiOperation({ summary: 'Get all documents' })
  @ApiResponse({
    status: 200,
    description: 'List of documents',
    type: [Document],
  })
  async findAll(): Promise<Document[]> {
    return await this.documentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a document by ID' })
  @ApiParam({ name: 'id', description: 'Document ID' })
  @ApiResponse({ status: 200, description: 'Found document', type: Document })
  @ApiNotFoundResponse()
  async findOne(@Param('id') id: number): Promise<Document> {
    return throwIfNull(
      await this.documentService.findOne(id),
      'Could not find this document',
    );
  }

  @Post()
  @ApiOperation({ summary: 'Create a new document' })
  @ApiBody({ type: CreateDocumentDto })
  @ApiResponse({
    status: 201,
    description: 'The created document',
    type: Document,
  })
  async create(@Body() data: CreateDocumentDto): Promise<Document> {
    return await this.documentService.create(data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a document' })
  @ApiParam({ name: 'id', description: 'Document ID' })
  @ApiBody({ type: UpdateDocumentDto })
  @ApiResponse({ status: 200, description: 'Updated document', type: Document })
  @ApiNotFoundResponse()
  async update(
    @Param('id') id: number,
    @Body() data: UpdateDocumentDto,
  ): Promise<Document> {
    return await this.documentService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a document' })
  @ApiParam({ name: 'id', description: 'Document ID' })
  @ApiResponse({ status: 200, description: 'Deleted document', type: Document })
  @ApiNotFoundResponse()
  async delete(@Param('id') id: number): Promise<Document> {
    return await this.documentService.delete(id);
  }
}
