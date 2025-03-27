import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from 'src/common/enums/user-role';

@Schema()
export class Auth extends Document {
  @Prop({ required: true, unique: true, minlength: 5 })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, default: UserRole.TENANT })
  role: UserRole; // foydalanuvchi ijara beruvchi (owner) yoki ijarachi (tenant) bo'lishi mumkin default tenant bo'ladi
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
