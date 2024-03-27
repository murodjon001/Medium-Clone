import { Body, Controller, Get, Patch, Query } from '@nestjs/common';
import { CategoryAuthorService } from './category-author.service';
import { AttachOrSeparateCategoryAuthorDto } from './dto/attach-or-separate-category-author.dto';
import { GetCurrentUser } from 'src/infrastucture/decorators/get-current-user';
import { AuthorEntity } from 'src/bounded-contexts/authors/entity/author.entity';
import { PaginationDto } from 'src/share/dtos/pagination.dto';

@Controller('category/author')
export class CategoryAuthorController {
  constructor(private readonly service: CategoryAuthorService) {}

  @Patch('attach/categories')
  attachCategoryAuthor(
    @Body() dto: AttachOrSeparateCategoryAuthorDto,
    @GetCurrentUser() user: AuthorEntity,
  ) {
    return this.service.attachCategoryAuthor(dto, user);
  }

  @Patch('separate/categories')
  separatingCategoryAuthor(
    @Body() dto: AttachOrSeparateCategoryAuthorDto,
    @GetCurrentUser() user: AuthorEntity,
  ) {
    return this.service.separatingCategoryAuthor(dto, user);
  }

  @Get()
  getAttachedCategories(
    @Query() pagination: PaginationDto,
    @GetCurrentUser() user: AuthorEntity,
  ) {
    return this.service.getAttachedCategories(user, pagination);
  }
}
