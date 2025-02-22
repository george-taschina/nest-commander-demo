import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class JwtPayloadDto {
  @ApiProperty({
    description: `User's ID`,
    example: 123,
  })
  @IsString()
  @IsNotEmpty()
  sub: number;

  @ApiProperty({
    description: 'The username',
    example: 'john_doe',
  })
  @IsString()
  @IsNotEmpty()
  username: string;
}
