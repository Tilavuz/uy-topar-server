import { IsEmail, IsEnum, IsString, Matches, MinLength } from 'class-validator';
import { Types } from 'mongoose';
import { GenderEnum } from 'src/common/enums/gender';
import { AuthResponseDto } from '../auth/auth.dto';

export class UserCreateDto {
  @IsString()
  @MinLength(3)
  name?: string;

  @IsString()
  @MinLength(3)
  surname?: string;

  @Matches(/^\+998[0-9]{9}$/, {
    message: 'Telefon raqami noto‘g‘ri formatda, masalan: +998901234567',
  })
  phone?: string;

  @IsEmail()
  email?: string;

  @IsEnum(GenderEnum)
  gender?: GenderEnum;

  @IsString()
  photo?: string;
  auth: Types.ObjectId;
}

export class UserResponseDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(3)
  surname: string;

  @Matches(/^\+998[0-9]{9}$/, {
    message: 'Telefon raqami noto‘g‘ri formatda, masalan: +998901234567',
  })
  phone: string;

  @IsEmail()
  email: string;

  @IsEnum(GenderEnum)
  gender: GenderEnum;

  @IsString()
  photo: string;
  auth: AuthResponseDto;
}

export class UserUpdateDto {
  @IsString()
  @MinLength(3)
  name?: string;

  @IsString()
  @MinLength(3)
  surname?: string;

  @Matches(/^\+998[0-9]{9}$/, {
    message: 'Telefon raqami noto‘g‘ri formatda, masalan: +998901234567',
  })
  phone?: string;

  @IsEmail()
  email?: string;

  @IsEnum(GenderEnum)
  gender?: GenderEnum;

  @IsString()
  photo?: string;
}
