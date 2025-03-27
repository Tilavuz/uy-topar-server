import { Schema } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User extends Document {
  name: string;
  surname: string;
  phone: string;
  email: string;
  gender: 'male' | 'female';
  photo: string;
  auth: Types.ObjectId; // auth id si
}
