import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './auth.schema';
import { Model } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import { AuthCreateDto, AuthResponseDto, AuthUpdateDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth.name) private authModel: Model<Auth>) {}

  async findAll(): Promise<AuthResponseDto[]> {
    const auths = await this.authModel.find().exec();
    return plainToInstance(AuthResponseDto, auths);
  }

  async findById(id: string): Promise<AuthResponseDto> {
    const auth = await this.authModel.findById(id).exec();
    return plainToInstance(AuthResponseDto, auth);
  }

  async findByUsername(username: string): Promise<AuthResponseDto> {
    const auth = await this.authModel.findOne({ username }).exec();
    return plainToInstance(AuthResponseDto, auth);
  }

  async create(authCreateDto: AuthCreateDto): Promise<AuthResponseDto> {
    const auth = await new this.authModel(authCreateDto);
    return plainToInstance(AuthResponseDto, auth);
  }

  async update({
    id,
    authUpdateDto,
  }: {
    id: string;
    authUpdateDto: AuthUpdateDto;
  }): Promise<AuthResponseDto> {
    const auth = this.authModel.findByIdAndUpdate(id, authUpdateDto).exec();
    return plainToInstance(AuthResponseDto, auth);
  }

  async delete(id: string): Promise<AuthResponseDto> {
    const auth = await this.authModel.findByIdAndDelete(id).exec();
    return plainToInstance(AuthResponseDto, auth);
  }
}
