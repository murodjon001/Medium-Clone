import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddCategoryDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;
}
