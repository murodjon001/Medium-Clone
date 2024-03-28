import { Module } from '@nestjs/common';
import { CategoryAdministrationController } from './category/administration/category-administration.controller';
import { CategoryAdministrationService } from './category/administration/category-administration.service';
import { CategoryRepository } from 'src/infrastucture/prisma/repository/content/category/category.repository';
import { PrismaModule } from 'src/infrastucture/prisma/prisma.module';
import { SubcategoryRepository } from 'src/infrastucture/prisma/repository/content/subcategory/subcategory.repository';
import { CategoryAuthorService } from './category/author/category-author.service';
import { AuthorRepository } from 'src/infrastucture/prisma/repository/author/author-repository';
import { CategoryAuthorController } from './category/author/category-author.controller';
import { SubcategoryAuthorService } from './subcategory/author/subcategory.author.service';
import { SubcategoryAdministrationController } from './subcategory/administration/subcategory-administration.controller';
import { SubcategoryAuthorController } from './subcategory/author/subcategory.author.controller';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { SubcategoryAdministrationService } from './subcategory/administration/subcategory-administration.service';

@Module({
  imports: [PrismaModule],
  controllers: [
    CategoryAdministrationController,
    CategoryAuthorController,
    SubcategoryAdministrationController,
    SubcategoryAuthorController,
    ContentController,
  ],
  providers: [
    CategoryAdministrationService,
    CategoryRepository,
    SubcategoryRepository,
    CategoryAuthorService,
    AuthorRepository,
    SubcategoryAuthorService,
    ContentService,
    SubcategoryAdministrationService,
  ],
})
export class ContentModule {}
