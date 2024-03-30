import { AuthorEntity } from 'src/bounded-contexts/blog/authors/entity/author.entity';
import { AttachOrSeparateContentDto } from 'src/bounded-contexts/content/dto/attach-or-separate-content.dto';
import { PaginationDto } from 'src/share/dtos/pagination.dto';
import { IPaginatedData } from 'src/share/interfaces/IPaginatedData';

export interface IAuthorRepository {
  validateAuthor(email: string): Promise<AuthorEntity>;
  findByEmail(email: string): Promise<AuthorEntity>;
  save(entity: AuthorEntity): Promise<AuthorEntity>;
  findOne(id: string): Promise<AuthorEntity>;
  findAll(pagination: PaginationDto): Promise<IPaginatedData<AuthorEntity>>;
  findByConfirmCode(confirmCode: string): Promise<AuthorEntity>;
  connectCategory(
    dto: AttachOrSeparateContentDto,
    authorId: string,
  ): Promise<void>;
  disconnectSubcategory(
    dto: AttachOrSeparateContentDto,
    authorId: string,
  ): Promise<void>;
  connectSubcategory(
    dto: AttachOrSeparateContentDto,
    authorId: string,
  ): Promise<void>;
  disconnectCategory(
    dto: AttachOrSeparateContentDto,
    authorId: string,
  ): Promise<void>;
}
