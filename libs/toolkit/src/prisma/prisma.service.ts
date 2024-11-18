import { PrismaClient } from '@prisma/client';
import { Global, Injectable } from '@nestjs/common';
import { throwUnprocessableEntity, throwNotFound } from '../errors';
import { prismaPaginationQuery } from '../helpers';

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total_docs: number;
    take: number;
    total_pages: number;
    page: number;
    paging_counter?: number;
    has_prev_page: boolean;
    has_next_page: boolean;
    prev: number;
    next: number;
  };
}
export type PaginateOptions = { page?: string; take?: string };

@Global()
@Injectable()
export class PrismaService extends PrismaClient {
  tables: string[];

  constructor() {
    super({ errorFormat: 'minimal' });
  }

  async findUniqueByIdOrThrow<T>({
    model,
    id,
    notFoundException = true,
    fieldError,
  }: {
    model: string;
    id: string;
    notFoundException?: boolean;
    fieldError?: { field: string; message: string };
  }): Promise<T> {
    const rawModel = await this[model].findUnique({ where: { id } });
    if (!rawModel) {
      if (fieldError) {
        throwUnprocessableEntity([fieldError]);
      } else if (notFoundException) {
        throwNotFound(`${model} not found`);
      }
    }
    return rawModel;
  }

  async paginate<T>(
    model: string,
    options: PaginateOptions,
    query: any = { where: undefined },
  ): Promise<PaginatedResult<T>> {
    const prismaModel = this[model];

    const { page, take, skip } = prismaPaginationQuery(options.page, options.take);

    const [total, data] = await Promise.all([
      prismaModel.count({ where: query.where }),
      prismaModel.findMany({
        ...query,
        take,
        skip,
      }),
    ]);

    const lastPage = Math.ceil(total / take);
    const prev = page > 1 ? page - 1 : null;
    const next = page < lastPage ? page + 1 : null;

    return {
      data,
      meta: {
        total_docs: total,
        total_pages: lastPage,
        page,
        take,
        prev,
        has_prev_page: Boolean(prev),
        next,
        has_next_page: Boolean(next),
      },
    };
  }
}
