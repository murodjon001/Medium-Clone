import { Injectable } from '@nestjs/common';
import { ICategoryAuthorService } from './type/ICategoryAuthorService';
import { AuthorRepository } from 'src/infrastucture/prisma/repository/author/author-repository';
import { CategoryRepository } from 'src/infrastucture/prisma/repository/content/category/category.repository';
import { AuthorEntity } from 'src/bounded-contexts/authors/entity/author.entity';
import { AttachOrSeparateContentDto } from '../../dto/attach-or-separate-content.dto';
import { CategoryEntity } from '../entity/categoty.entity';
import {
  PaginationDto,
  PaginationResponseDto,
} from 'src/share/dtos/pagination.dto';

@Injectable()
export class CategoryAuthorService implements ICategoryAuthorService {
  constructor(
    private readonly authorRepository: AuthorRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async attachCategoryAuthor(
    dto: AttachOrSeparateContentDto,
    user: AuthorEntity,
  ): Promise<string> {
    await this.authorRepository.connectCategory(dto, user.id);

    return 'success';
  }

  async separatingCategoryAuthor(
    dto: AttachOrSeparateContentDto,
    user: AuthorEntity,
  ): Promise<string> {
    await this.authorRepository.disconnectCategory(dto, user.id);

    return 'success';
  }

  async getAttachedCategories(
    user: AuthorEntity,
    pagination: PaginationDto,
  ): Promise<PaginationResponseDto<CategoryEntity>> {
    const categoryByAuthor =
      await this.categoryRepository.getCategoryByAuthorId(pagination, user.id);

    return PaginationResponseDto.createFrom({
      data: categoryByAuthor.data,
      total: categoryByAuthor.total,
      page: pagination.page,
      size: pagination.size,
    });
  }
}
