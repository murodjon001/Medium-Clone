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
import { PaginationDto } from 'src/share/dtos/pagination.dto';
import { SubcategoryAdministrationService } from './subcategory-administration.service';
import { AddSubcategoryDto } from './dto/add-sucategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { SuperUserJwtAuthGuard } from 'src/infrastucture/security/guards/superuser-jwt-auth.guard';

@UseGuards(SuperUserJwtAuthGuard)
@Controller('subcategory/adminstration')
export class SubcategoryAdministrationController {
  constructor(
    private readonly subcategoryAdministrationService: SubcategoryAdministrationService,
  ) {}

  @Post()
  addSubcategory(@Body() dto: AddSubcategoryDto) {
    return this.subcategoryAdministrationService.addSubcategory(dto);
  }

  @Patch(':id')
  updateSubcategory(
    @Body() dto: UpdateSubcategoryDto,
    @Param('id') id: string,
  ) {
    return this.subcategoryAdministrationService.updateSubcategory(dto, id);
  }

  @Get()
  findSubcategories(@Query() pagination: PaginationDto) {
    return this.subcategoryAdministrationService.findSubcategories(pagination);
  }

  @Get(':id')
  findSubcategory(@Param('id') id: string) {
    return this.subcategoryAdministrationService.findSubcategory(id);
  }

  @Delete(':id')
  deleteSubcategory(@Param('id') id: string) {
    return this.subcategoryAdministrationService.deleteSubcategory(id);
  }
}
