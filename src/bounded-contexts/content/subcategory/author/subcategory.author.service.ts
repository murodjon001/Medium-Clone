import { Injectable } from '@nestjs/common';
import { AuthorRepository } from 'src/infrastucture/prisma/repository/author/author-repository';
import { AuthorEntity } from 'src/bounded-contexts/blog/authors/entity/author.entity';
import { AttachOrSeparateContentDto } from '../../dto/attach-or-separate-content.dto';
import {
  PaginationDto,
  PaginationResponseDto,
} from 'src/share/dtos/pagination.dto';
import { SubcategoryRepository } from 'src/infrastucture/prisma/repository/content/subcategory/subcategory.repository';
import { ISubcategoryAuthorService } from './type/ISubcategoryAuthor';
import { SubcategoryEntity } from '../entity/subcategory.entity';

@Injectable()
export class SubcategoryAuthorService implements ISubcategoryAuthorService {
  constructor(
    private readonly authorRepository: AuthorRepository,
    private readonly subcategoryRepository: SubcategoryRepository,
  ) {}

  async attachSubcategoryAuthor(
    dto: AttachOrSeparateContentDto,
    user: AuthorEntity,
  ): Promise<string> {
    await this.authorRepository.connectSubcategory(dto, user.id);

    return 'success';
  }

  async separatingSubcategoryAuthor(
    dto: AttachOrSeparateContentDto,
    user: AuthorEntity,
  ): Promise<string> {
    await this.authorRepository.disconnectSubcategory(dto, user.id);

    return 'success';
  }

  async getAttachedSubcategories(
    user: AuthorEntity,
    pagination: PaginationDto,
  ): Promise<PaginationResponseDto<SubcategoryEntity>> {
    const subcategoryByAuthor =
      await this.subcategoryRepository.getSubcategoryByAuthorId(
        pagination,
        user.id,
      );

    return PaginationResponseDto.createFrom({
      data: subcategoryByAuthor.data,
      total: subcategoryByAuthor.total,
      page: pagination.page,
      size: pagination.size,
    });
  }
}
