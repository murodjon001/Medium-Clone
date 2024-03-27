import { IsArray, IsNotEmpty } from 'class-validator';

export class AttachOrSeparateCategoryAuthorDto {
  @IsNotEmpty()
  @IsArray()
  categoryIds: string[];
}
