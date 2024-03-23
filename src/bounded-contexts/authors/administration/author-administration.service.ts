import { Injectable, NotFoundException } from '@nestjs/common';
import { IAuthorAdministrationService } from './type/IAuthorAdministrationService';
import { AuthorDto } from '../dto/author.dto';
import {
  PaginationDto,
  PaginationResponseDto,
} from 'src/share/dtos/pagination.dto';
import { AuthorRepository } from 'src/infrastucture/prisma/repository/author/author-repository';

@Injectable()
export class AuthorAdministrationService
  implements IAuthorAdministrationService
{
  constructor(private readonly authorRepository: AuthorRepository) {}

  async findAuthor(id: string): Promise<AuthorDto> {
    const author = await this.authorRepository.findOne(id);

    if (!author) {
      throw new NotFoundException('Author not found');
    }

    return new AuthorDto(author);
  }

  async findAuthors(
    pagination: PaginationDto,
  ): Promise<PaginationResponseDto<AuthorDto>> {
    const { data, total } = await this.authorRepository.findAll(pagination);

    return PaginationResponseDto.createFrom({
      data,
      total,
      page: pagination.page,
      size: pagination.size,
    });
  }

  async blockAuthor(id: string): Promise<string> {
    const author = await this.authorRepository.findOne(id);

    if (!author) {
      throw new NotFoundException('Author not found');
    }

    author.blockAuthor();
    await this.authorRepository.save(author)
    return 'success'
  }
}
