import { AuthorEntity } from 'src/bounded-contexts/authors/entity/author.entity';
import { AttachOrSeparateContentDto } from '../../../dto/attach-or-separate-content.dto';
import { CategoryEntity } from '../../entity/categoty.entity';
import {
  PaginationDto,
  PaginationResponseDto,
} from 'src/share/dtos/pagination.dto';

export interface ICategoryAuthorService {
  attachCategoryAuthor(
    dto: AttachOrSeparateContentDto,
    user: AuthorEntity,
  ): Promise<string>;
  separatingCategoryAuthor(
    dto: AttachOrSeparateContentDto,
    user: AuthorEntity,
  ): Promise<string>;
  getAttachedCategories(
    user: AuthorEntity,
    pagination: PaginationDto,
  ): Promise<PaginationResponseDto<CategoryEntity>>;
}
