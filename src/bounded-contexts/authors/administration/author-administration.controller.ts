import {
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthorAdministrationService } from './author-administration.service';
import { PaginationDto } from 'src/share/dtos/pagination.dto';
import { SuperUserJwtAuthGuard } from 'src/infrastucture/security/guards/superuser-jwt-auth.guard';

@UseGuards(SuperUserJwtAuthGuard)
@Controller('author/administration')
export class AuthorAdministrationController {
  constructor(
    private readonly authorAdministrationService: AuthorAdministrationService,
  ) {}

  @Get()
  getAllAuthors(@Query() pagination: PaginationDto) {
    return this.authorAdministrationService.findAuthors(pagination);
  }

  @Get(':id')
  getAuthor(@Param('id') authorId: string) {
    return this.authorAdministrationService.findAuthor(authorId);
  }

  @Patch(':id')
  blockAuthor(@Param('id') authorId: string) {
    return this.authorAdministrationService.blockAuthor(authorId);
  }
}
