import { Module } from '@nestjs/common';
import { CategoryAdministrationController } from './category/administration/category-administration.controller';
import { CategoryAdministrationService } from './category/administration/category-administration.service';
import { CategoryRepository } from 'src/infrastucture/prisma/repository/content/category/category.repository';
import { PrismaModule } from 'src/infrastucture/prisma/prisma.module';
import { SubcategoryRepository } from 'src/infrastucture/prisma/repository/content/subcategory/subcategory.repository';

@Module({
  imports: [PrismaModule],
  controllers: [CategoryAdministrationController],
  providers: [
    CategoryAdministrationService,
    CategoryRepository,
    SubcategoryRepository,
  ],
})
export class ContentModule {}
