import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDocumentDto {
  @ApiProperty({
    description: 'The content of the document',
    example: 'This is the content.',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'The owner of the document',
    example: 'john_doe',
  })
  @IsString()
  @IsNotEmpty()
  owner: string;
}
