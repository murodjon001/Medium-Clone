import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minNumbers: 2,
    minUppercase: 2,
  })
  newPassword: string;

  @IsNotEmpty()
  @IsString()
  confirmNewPassword: string;
}
