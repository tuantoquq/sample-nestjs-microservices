import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  roles?: string[];
}
