import { BaseService, LikeSelect } from '@app/shared';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LikesService extends BaseService {
  async likeUsers(postId: string) {
    return await this.prisma.like.findMany({
      where: { post_id: postId },
      select: LikeSelect,
    });
  }

  async like(userId: string, postId: string) {
    const like = await this.findLike(userId, postId);

    if (!like) {
      try {
        return await this.prisma.like.create({
          data: { user_id: userId, post_id: postId },
        });
      } catch (error) {
        this.catchError(error, 'LikesService');
      }
    } else {
      this.badRequestException();
    }
  }

  async dislike(userId: string, postId: string) {
    const like = await this.findLike(userId, postId);

    if (like) {
      try {
        await this.prisma.like.delete({
          where: { id: like.id },
        });
      } catch (error) {
        this.catchError(error, 'LikesService');
      }
    } else {
      this.badRequestException();
    }
  }

  async findLike(userId: string, postId: string) {
    return await this.prisma.like.findFirst({
      where: {
        user_id: userId,
        post_id: postId,
      },
    });
  }
}
