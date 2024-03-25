import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class AddSubcategoryDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @IsNotEmpty()
  @IsOptional()
  description: string;
}
