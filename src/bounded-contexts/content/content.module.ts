import { Module } from '@nestjs/common';
import { CategoryAdministrationController } from './category/administration/category-administration.controller';
import { CategoryAdministrationService } from './category/administration/category-administration.service';
import { CategoryRepository } from 'src/infrastucture/prisma/repository/content/category/category.repository';
import { PrismaModule } from 'src/infrastucture/prisma/prisma.module';
import { SubcategoryRepository } from 'src/infrastucture/prisma/repository/content/subcategory/subcategory.repository';
import { CategoryAuthorService } from './category/author/category-author.service';
import { AuthorRepository } from 'src/infrastucture/prisma/repository/author/author-repository';
import { CategoryAuthorController } from './category/author/category-author.controller';

@Module({
  imports: [PrismaModule],
  controllers: [CategoryAdministrationController, CategoryAuthorController],
  providers: [
    CategoryAdministrationService,
    CategoryRepository,
    SubcategoryRepository,
    CategoryAuthorService,
    AuthorRepository,
  ],
})
export class ContentModule {}
