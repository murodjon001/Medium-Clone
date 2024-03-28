import { Body, Controller, Get, Patch, Query, UseGuards } from '@nestjs/common';
import { AttachOrSeparateContentDto } from '../../dto/attach-or-separate-content.dto';
import { GetCurrentUser } from 'src/infrastucture/decorators/get-current-user';
import { AuthorEntity } from 'src/bounded-contexts/authors/entity/author.entity';
import { PaginationDto } from 'src/share/dtos/pagination.dto';
import { AuthorJwtGuard } from 'src/infrastucture/security/guards/author/author-jwt-auth.guard';
import { SubcategoryAuthorService } from './subcategory.author.service';

@UseGuards(AuthorJwtGuard)
@Controller('subcategory/author')
export class SubcategoryAuthorController {
  constructor(private readonly service: SubcategoryAuthorService) {}

  @Patch('attach/subcategories')
  attachSubcategoryAuthor(
    @Body() dto: AttachOrSeparateContentDto,
    @GetCurrentUser() user: AuthorEntity,
  ) {
    return this.service.attachSubcategoryAuthor(dto, user);
  }

  @Patch('separate/subcategories')
  separatingSubcategoryAuthor(
    @Body() dto: AttachOrSeparateContentDto,
    @GetCurrentUser() user: AuthorEntity,
  ) {
    return this.service.separatingSubcategoryAuthor(dto, user);
  }

  @Get()
  getAttachedSubcategories(
    @Query() pagination: PaginationDto,
    @GetCurrentUser() user: AuthorEntity,
  ) {
    return this.service.getAttachedSubcategories(user, pagination);
  }
}
