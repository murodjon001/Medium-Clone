import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateAuthorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  surname: string;


  @IsOptional()
  @IsString()
  aboutAuthor: string;
}
