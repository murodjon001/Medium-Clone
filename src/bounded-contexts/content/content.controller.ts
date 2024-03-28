import { Controller, Get, Param, Query } from '@nestjs/common';
import { ContentService } from './content.service';
import { PaginationDto } from 'src/share/dtos/pagination.dto';

@Controller('content')
export class ContentController {
  constructor(private readonly service: ContentService) {}

  @Get('categories')
  findAllCategories(@Query() pagination: PaginationDto) {
    return this.service.findCategories(pagination);
  }

  @Get('subcategories')
  findAllSubcategories(@Query() pagination: PaginationDto) {
    return this.service.findSubcategories(pagination);
  }

  @Get('subcategory/:id')
  findSubcategory(@Param('id') id: string) {
    return this.service.findSubcategory(id);
  }

  @Get('category/:id')
  findCategory(@Param('id') id: string) {
    return this.service.findCategory(id);
  }

  @Get('category-with-subcategories/:id')
  findCategoryWithSubcategories(@Param('id') id: string) {
    return this.service.findCategoryWithSubcategories(id);
  }
}
