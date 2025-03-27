import { Prop, Schema } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true }) // createdAt va updatedAt qo'shish uchun
export class House extends Document {
  @Prop({ required: true })
  title: string; // "Yangi ta’mirlangan 3 xonali kvartira ijaraga beriladi"

  @Prop({ required: true, enum: ['apartment', 'yard'] })
  type: 'apartment' | 'yard'; // Uy turi

  @Prop({ required: true })
  desc: string;

  @Prop({ required: true, enum: ['day', 'month', 'long term'] })
  rent_type: 'day' | 'month' | 'long term';

  @Prop({ required: true })
  price: number;

  @Prop({
    type: { region: String, district: String },
    required: true,
  })
  address: {
    region: string; // Viloyat yoki shahar
    district: string; // Tuman yoki shahar
  };

  @Prop({
    type: { lat: Number, lng: Number },
    required: true,
  })
  location: {
    lat: number;
    lng: number;
  }; // Xaritadagi koordinatalar

  @Prop({ required: true })
  rooms: number; // Xonalar soni (ikkalasida ham bo'ladi)

  @Prop()
  area: number; // Maydon (km² yoki m² sifatida string, lekin number qilish mumkin)

  @Prop()
  builtYear: number; // Qurilgan yili (string o'rniga number qilish mumkin)

  @Prop({ enum: ['new', 'good', 'moderately', 'repair required'] })
  condition: 'new' | 'good' | 'moderately' | 'repair required';

  @Prop({
    type: {
      water: Boolean,
      gas: Boolean,
      electricity: Boolean,
      heating: { type: String, enum: ['central', 'gas', 'electr', "no"] },
    },
    default: { water: false, gas: false, electr: false, heating: "no" },
  })
  utilities: {
    water: boolean;
    gas: boolean;
    electr: boolean;
    heating: 'central' | 'gas' | 'electr' | "no";
  }; // isitish turi va mavjut kamunal to'lovlar

  @Prop([String])
  amenities: string[]; // Kir moshina, oshxona jihozlari va hokazo

  @Prop({
    type: {
      family: Boolean,
      petsAllowed: Boolean,
      minRentalPeriod: Number,
      students: Boolean,
      boys: Boolean,
      girls: Boolean,
    },
    default: {
      family: true,
      petsAllowed: true,
      minRentalPeriod: 1,
      students: true,
      boys: true,
      girls: true,
    },
  })
  rules: {
    family: boolean;
    petsAllowed: boolean;
    minRentalPeriod: number;
    students: boolean;
    boys: boolean;
    girls: boolean;
  };

  @Prop([String])
  photos: string[];

  @Prop([String])
  hashtags: string[];

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  owner: Types.ObjectId; // Uy egasi (User modeliga reference)
}
