import { IsArray, IsNotEmpty } from 'class-validator';

export class AttachOrSeparateContentDto {
  @IsNotEmpty()
  @IsArray()
  ids: string[];
}
