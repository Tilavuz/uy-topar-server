import { IsEnum, IsString, MinLength } from 'class-validator';
import { UserRole } from 'src/common/enums/user-role';

export class AuthCreateDto {
  @IsString()
  @MinLength(5)
  username: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}

export class AuthResponseDto {
  _id: string;
  username: string;
  role: string;
}

export class AuthUpdateDto {
  @IsString()
  @MinLength(5)
  username: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}
