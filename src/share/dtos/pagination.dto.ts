import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class PaginationDto {
  @IsNotEmpty()
  @Transform(({ value }) => +value)
  @IsNumber()
  page: number;

  @IsNotEmpty()
  @Transform(({ value }) => +value)
  @IsNumber()
  size: number;

  getSkip() {
    return (this.page - 1) * this.size;
  }
}

export class PaginationResponseDto<T> {
  data: T[];
  total: number;
  page: number;
  size: number;
  totalPages: number;

  constructor(data: T[], total: number, page: number, size: number) {
    this.data = data;
    this.total = total;
    this.page = page;
    this.size = size;
    this.totalPages = Math.ceil(total / size);
  }

  static createFrom<T>(data: {
    data: T[];
    total: number;
    page: number;
    size: number;
  }): PaginationResponseDto<T> {
    return new PaginationResponseDto<T>(
      data.data,
      data.total,
      data.page,
      data.size,
    );
  }
}