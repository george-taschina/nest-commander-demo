import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInResponseDto {
  @ApiProperty({
    description: 'The JWT token',
    example: 'token123',
  })
  @IsString()
  @IsNotEmpty()
  access_token: string;
}
