import { AuthorEntity } from 'src/bounded-contexts/authors/entity/author.entity';
import { AttachOrSeparateCategoryAuthorDto } from '../dto/attach-or-separate-category-author.dto';
import { CategoryEntity } from '../../entity/categoty.entity';
import {
  PaginationDto,
  PaginationResponseDto,
} from 'src/share/dtos/pagination.dto';

export interface ICategoryAuthorService {
  attachCategoryAuthor(
    categoryIds: AttachOrSeparateCategoryAuthorDto,
    user: AuthorEntity,
  ): Promise<string>;
  separatingCategoryAuthor(
    categoryIds: AttachOrSeparateCategoryAuthorDto,
    user: AuthorEntity,
  ): Promise<string>;
  getAttachedCategories(
    user: AuthorEntity,
    pagination: PaginationDto,
  ): Promise<PaginationResponseDto<CategoryEntity>>;
}
