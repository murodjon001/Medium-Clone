import { AuthorEntity } from 'src/bounded-contexts/authors/entity/author.entity';
import { AttachOrSeparateContentDto } from 'src/bounded-contexts/content/dto/attach-or-separate-content.dto';
import {
  PaginationDto,
  PaginationResponseDto,
} from 'src/share/dtos/pagination.dto';
import { SubcategoryEntity } from '../../entity/subcategory.entity';

export interface ISubcategoryAuthorService {
  attachSubcategoryAuthor(
    dto: AttachOrSeparateContentDto,
    user: AuthorEntity,
  ): Promise<string>;
  separatingSubcategoryAuthor(
    dto: AttachOrSeparateContentDto,
    user: AuthorEntity,
  ): Promise<string>;
  getAttachedSubcategories(
    user: AuthorEntity,
    pagination: PaginationDto,
  ): Promise<PaginationResponseDto<SubcategoryEntity>>;
}
