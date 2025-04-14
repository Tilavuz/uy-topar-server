import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCreateDto, AuthUpdateDto } from './auth.dto';

@Controller('auths')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async findAll() {
    return await this.authService.findAll();
  }

  @Post('create')
  async create(@Body() authCreateDto: AuthCreateDto) {
    return await this.authService.create(authCreateDto);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.authService.findById(id);
  }

  @Get(':username')
  async findByUsername(@Param('username') username: string) {
    return await this.authService.findByUsername(username);
  }

  @Put('update/:id')
  async update(@Param('id') id: string, @Body() authUpdateDto: AuthUpdateDto) {
    return await this.authService.update({ id, authUpdateDto });
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.authService.delete(id);
  }
}
