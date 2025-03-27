import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './auth.schema';
import { Model } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import { AuthResponseDto } from './auth.dto';

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
}
