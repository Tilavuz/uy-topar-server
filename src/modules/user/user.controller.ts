import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserUpdateDto } from './user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  async findAll() {
    try {
      return this.service.findAll();
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException('Server error!');
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    try {
      return this.service.findById(id);
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      return new BadRequestException('Server Error!');
    }
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    try {
      return this.service.delete(id);
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      return new BadRequestException('Server error!');
    }
  }

  @Put('update/:id')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads', // Fayllar saqlanadigan papka
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExt = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${fileExt}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        // Faqat rasm fayllarini qabul qilish
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return cb(
            new Error('Faqat rasm fayllari qo‘llab-quvvatlanadi'),
            false,
          );
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB cheklov
    }),
  )
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() userUpdateDto: UserUpdateDto,
  ) {
    try {
      if (file) {
        userUpdateDto.photo = `${process.env.API_URL}/uploads/${file.filename}`;
      }
      return this.service.update({ id, userUpdateDto });
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      return new BadRequestException('Server error!');
    }
  }
}
