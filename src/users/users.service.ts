import { Injectable } from '@nestjs/common';
import { BaseService, ShortUserSelect, UserSelect } from '@app/shared';

interface ListProps {
  kind?: string;
  page?: string;
  take?: string;
  search?: string;
  userId?: string;
}

@Injectable()
export class UsersService extends BaseService {
  async list({ kind, page, take, search, userId }: ListProps = {}, shortList = true): Promise<any> {
    const query: any = {
      where: {},
      orderBy: {
        created_at: 'desc',
      },
      select: UserSelect,
    };

    if (shortList) {
      query.select = ShortUserSelect;
    }

    if (search) {
      query['where']['OR'] = [
        { mobile: { contains: search } },
        { fullname: { contains: search } },
        { email: { contains: search } },
      ];
    }

    if (kind) {
      query['where'] = { ...query['where'], kind };
    }

    if (userId) {
      query['where'] = { id: userId };
    }

    return this.prisma.paginate('user', { page, take }, query);
  }

  async show(userId: string) {
    return this.findUserById(userId);
  }
}
