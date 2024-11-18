import * as dayjs from 'dayjs';
import { Global, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { uuid } from '../helpers';
import { TokensResponse } from './tokens.responses';
import { UserPlanStatusEnum, UserStatusEnum, WorkspaceStatusEnum } from '../enums';
import { PrismaService, Sha256Service, throwInternalServerError } from '@app/toolkit';

@Global()
@Injectable()
export class TokensService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sha256: Sha256Service,
    private readonly configs: ConfigService,
  ) {}

  async createNewTokens(clientId: string): Promise<TokensResponse> {
    const refreshToken = uuid();
    const accessToken = uuid();

    const expiresAt = this.getTokenExpiresAt();
    const refreshExpiresAt = this.getRefreshTokenExpiresAt();

    const data = {
      user_id: clientId,
      refresh_token: this.sha256.strToSha256(refreshToken),
      access_token: this.sha256.strToSha256(accessToken),
      expires_at: expiresAt,
      refresh_expires_at: refreshExpiresAt,
      invoked: false,
    };

    try {
      await this.prisma.token.create({ data });

      return {
        refresh_token: refreshToken,
        access_token: accessToken,
        expires_at: expiresAt,
      };
    } catch (error) {
      throwInternalServerError();
    }
  }

  async fetchUserByAccessToken(token: string): Promise<{ user: any; accessToken: string }> {
    const accessToken = this.sha256.strToSha256(token);

    const user = await this.prisma.user.findFirst({
      where: {
        status: UserStatusEnum.Active,
        tokens: {
          some: {
            access_token: accessToken,
            expires_at: {
              gte: dayjs().toISOString(),
            },
            invoked: false,
          },
        },
      },
      include: {
        profile: true,
        teams: {
          include: {
            workspace: true,
          },
        },
      },
    });

    return { user, accessToken };
  }

  async fetchWorkspaceByKey({
    key,
    userId,
    appType,
  }: {
    key: string;
    userId: string;
    appType?: 'dashboard' | 'web-app';
  }): Promise<any> {
    let where = {
      key,
      status: WorkspaceStatusEnum.Active,
    };

    if (appType && appType === 'dashboard') {
      where['teams'] = {
        some: {
          user_id: userId,
        },
      };
    }

    return await this.prisma.workspace.findFirst({
      where,
      include: {
        teams: true,
      },
    });
  }

  async findUserPlan(userId: string): Promise<any> {
    return await this.prisma.userPlan.findFirst({
      where: {
        user_id: userId,
        status: UserPlanStatusEnum.Active,
      },
    });
  }

  async fetchUserByAccessTokenAndRefreshToken(
    accessToken: string,
    refreshToken: string,
  ): Promise<IUser | null> {
    return await this.prisma.user.findFirst({
      where: {
        tokens: {
          some: {
            access_token: this.sha256.strToSha256(accessToken),
            refresh_token: this.sha256.strToSha256(refreshToken),
            refresh_expires_at: {
              gte: dayjs().toISOString(),
            },
            invoked: false,
          },
        },
      },
    });
  }

  async revokeToken(token: string) {
    return await this.prisma.token.update({
      where: {
        access_token: token,
      },
      data: {
        invoked: true,
      },
    });
  }

  getTokenExpiresAt() {
    const ttl = this.configs.get<number>('token.ttl.user') || this.configs.get<number>('token.ttl.default');

    return dayjs()
      .add(ttl || 5, 'h')
      .toISOString();
  }

  getRefreshTokenExpiresAt() {
    const ttl =
      this.configs.get<number>('token.refreshTtl.user') ||
      this.configs.get<number>('token.refreshTtl.default');

    return dayjs()
      .add(ttl || 5, 'h')
      .toISOString();
  }
}
