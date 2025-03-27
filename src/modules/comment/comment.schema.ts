import { Schema } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Comment extends Document {
  user: Types.ObjectId; // Kamment yozgan foydalanuvchi id si user id
  house: Types.ObjectId; // Kamment yozilgan uy id si house id
  message: string; // kamment matni
}
