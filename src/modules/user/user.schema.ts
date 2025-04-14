import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, enum: ['male', 'female'] })
  gender: 'male' | 'female';

  @Prop({
    required: true,
    unique: true,
    minlength: 9,
    maxlength: 15,
    match: [/^\+998[0-9]{9}$/, 'Invalid phone number format'],
  })
  photo: string;

  @Prop({ type: Types.ObjectId, ref: 'Auth', required: true })
  auth: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
