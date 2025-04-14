import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import { User } from './user.schema';
import { UserResponseDto, UserUpdateDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private model: Model<User>) {}

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.model.find().populate('auth').lean().exec();
    return plainToInstance(UserResponseDto, users);
  }

  async findById(id: string): Promise<UserResponseDto> {
    const user = await this.model.findById(id).populate('auth').lean().exec();
    if (!user) {
      throw new NotFoundException('Foydalanuvchi topilmadi');
    }
    return plainToInstance(UserResponseDto, user);
  }

  async update({
    id,
    userUpdateDto,
  }: {
    id: string;
    userUpdateDto: UserUpdateDto;
  }): Promise<UserResponseDto> {
    try {
      let user = await this.model.findById(id);

      if (userUpdateDto.name) user.name = userUpdateDto.name;
      if (userUpdateDto.surname) user.surname = userUpdateDto.surname;
      if (userUpdateDto.phone) user.phone = userUpdateDto.phone;
      if (userUpdateDto.email) user.email = userUpdateDto.email;
      if (userUpdateDto.gender) user.gender = userUpdateDto.gender;
      if (userUpdateDto.photo) user.photo = userUpdateDto.photo;

      const userSave = await user.save();
      user = await userSave.populate('auth');

      return plainToInstance(UserResponseDto, user);
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException('Server error!');
    }
  }

  async delete(id: string): Promise<UserResponseDto> {
    try {
      const user = await this.model.findByIdAndDelete(id);
      return plainToInstance(UserResponseDto, user);
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new BadRequestException('Server error!');
    }
  }
}
