import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDocumentDto } from './create-document.dto';
import { IsString } from 'class-validator';

export class UpdateDocumentDto extends PartialType(CreateDocumentDto) {
  @ApiProperty({
    description: 'The content of the document',
    example: 'Updated content.',
    required: false,
  })
  @IsString()
  content?: string;

  @ApiProperty({
    description: 'The owner of the document',
    example: 'john_doe_updated',
    required: false,
  })
  @IsString()
  owner?: string;
}
