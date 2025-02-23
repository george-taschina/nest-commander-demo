import { ApiProperty } from '@nestjs/swagger';

export class ResponseDocumentDto {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of the document',
  })
  id: number;

  @ApiProperty({
    example: 'This is the content of the document',
    description: 'The content of the document',
  })
  content: string;

  @ApiProperty({
    example: 'john.doe',
    description: 'The owner of the document',
  })
  owner: string;

  @ApiProperty({
    example: '2025-02-23T00:00:00.000Z',
    description: 'The date when the document was created',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2025-02-23T00:00:00.000Z',
    description: 'The date when the document was last updated',
  })
  updatedAt: Date;
}
