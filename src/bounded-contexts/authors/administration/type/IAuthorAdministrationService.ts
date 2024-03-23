import {
  PaginationDto,
  PaginationResponseDto,
} from 'src/share/dtos/pagination.dto';
import { AuthorDto } from '../../dto/author.dto';

export interface IAuthorAdministrationService {
  findAuthor(id: string): Promise<AuthorDto>;
  findAuthors(
    pagination: PaginationDto,
  ): Promise<PaginationResponseDto<AuthorDto>>;
  blockAuthor(id: string): Promise<string>;
}
