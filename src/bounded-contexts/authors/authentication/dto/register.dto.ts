import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterAuthorDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @MinLength(5)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @MinLength(1)
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minNumbers: 2,
    minUppercase: 1,
    minSymbols: 1,
  })
  password: string;
}
