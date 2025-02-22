import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInDto } from '../documents/dto/sign-in.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { SignInResponseDto } from '../documents/dto/sing-in-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get Token of user' })
  @ApiBody({ type: SignInDto })
  @ApiResponse({
    status: 200,
    description: 'The JWT token of the user',
    type: SignInResponseDto,
  })
  @ApiBadRequestResponse()
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}
