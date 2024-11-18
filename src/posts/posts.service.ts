import { BaseService, PostSelect, PostStatusEnum } from '@app/shared';
import { Injectable } from '@nestjs/common';
import { PostDto } from './posts.dto';

@Injectable()
export class PostsService extends BaseService {
  async list({
    page,
    take,
    none,
    search,
    recent,
  }: { page?: string; take?: string; none?: string; search?: string; recent?: string } = {}) {
    const query: any = {
      where: {},
      orderBy: [
        {
          likes: { _count: 'desc' },
        },
        { created_at: 'desc' },
      ],
      select: PostSelect,
    };

    if (!none) {
      query.where = { status: PostStatusEnum.Active };
    }

    if (recent) {
      query.orderBy = { created_at: 'desc' };
    }

    if (search) {
      query['where']['OR'] = [{ title: { contains: search } }, { tags: { contains: search } }];
    }

    return this.prisma.paginate('post', { page, take }, query);
  }

  async show(postId: string) {
    const post = await this.prisma.post.findFirst({
      where: { id: postId },
      select: PostSelect,
    });

    if (!post) {
      this.notFoundException('The requested post was not found');
    }

    return post;
  }

  async create(dto: PostDto) {
    try {
      return await this.prisma.post.create({
        data: {
          ...dto,
          owner_id: await this._userId(),
        },
      });
    } catch (error) {
      this.catchError(error, 'PostsService');
    }
  }

  async update(postId: string, dto: PostDto) {
    const post = await this.prisma.post.findFirst({
      where: { id: postId },
    });

    if (!post) {
      this.notFoundException('The requested post was not found');
    }

    try {
      return await this.prisma.post.update({
        where: { id: postId },
        data: dto,
      });
    } catch (error) {
      this.catchError(error, 'PostsService');
    }
  }
}
