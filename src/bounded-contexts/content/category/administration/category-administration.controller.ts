import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CategoryAdministrationService } from './category-administration.service';
import { AddCategoryDto } from './dto/add-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PaginationDto } from 'src/share/dtos/pagination.dto';
import { SuperUserJwtAuthGuard } from 'src/infrastucture/security/guards/superuser-jwt-auth.guard';

@UseGuards(SuperUserJwtAuthGuard)
@Controller('category/adminstration')
export class CategoryAdministrationController {
  constructor(
    private readonly categoryAdministrationService: CategoryAdministrationService,
  ) {}

  @Post()
  addCategory(@Body() dto: AddCategoryDto) {
    return this.categoryAdministrationService.addCategory(dto);
  }

  @Patch(':id')
  updateCategory(@Body() dto: UpdateCategoryDto, @Param('id') id: string) {
    return this.categoryAdministrationService.updateCategory(dto, id);
  }

  @Get()
  findCategories(@Query() pagination: PaginationDto) {
    return this.categoryAdministrationService.findCategories(pagination);
  }

  @Get(':id')
  findCategory(@Param('id') id: string) {
    return this.categoryAdministrationService.findCategory(id);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: string) {
    return this.categoryAdministrationService.deleteCategory(id);
  }
}
