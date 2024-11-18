import { ApiBearerAuth } from '@nestjs/swagger';
import { TokensService, UserKindEnum, UserStatusEnum } from '@app/shared';
import {
  throwForbidden,
  throwLimitedUnAuthorized,
  throwServiceUnAvailable,
  throwUnAuthorized,
} from '@app/toolkit';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  applyDecorators,
  UseGuards,
  createParamDecorator,
} from '@nestjs/common';

type TAppType = 'dashboard' | 'web-app';

const getTokenFromRequest = (request: any) => {
  let token;
  let workspaceKey;
  let appType: TAppType;

  try {
    token = request.headers['authorization'] || request.headers['Authorization'];
    token = token.replace('Bearer ', '').replace('bearer ', '');
  } catch (error) {
    token = undefined;
  }

  try {
    workspaceKey = request.headers['x-work-key'] || request.headers['X-Work-Key'];
  } catch (error) {
    workspaceKey = undefined;
  }

  try {
    appType = request.headers['x-app-type'] || request.headers['X-App-Type'];
  } catch (error) {
    appType = undefined;
  }

  if (!token) {
    throwUnAuthorized();
  }

  return { token, workspaceKey, appType };
};

@Injectable()
export class UserTokenGuard implements CanActivate {
  constructor(private readonly tokenService: TokensService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const { token, workspaceKey, appType } = getTokenFromRequest(request);
    const { user, accessToken } = await this.tokenService.fetchUserByAccessToken(token);

    request.appType = appType;

    if (user) {
      if (user.status !== UserStatusEnum.Active) {
        throwLimitedUnAuthorized();
      }

      if (workspaceKey) {
        const workspace = await this.tokenService.fetchWorkspaceByKey({
          key: workspaceKey,
          userId: user.id,
          appType,
        });

        if (!workspace) {
          throwServiceUnAvailable();
        }

        request.workspace = workspace;
        request.workspaceId = workspace.id;
      }

      delete user.password;
      request.user = user;
      request.userId = user.id;
      request.accessToken = accessToken;
      request.isCoach = user.kind === UserKindEnum.Coach;
      request.isAthlete = user.kind === UserKindEnum.Athlete;

      return true;
    }

    throwUnAuthorized();
  }
}

export function UserGuard() {
  return applyDecorators(UseGuards(UserTokenGuard), ApiBearerAuth());
}

export const User = createParamDecorator((data, req) => {
  return req.args[0].user;
});

export const Athlete = createParamDecorator((_, req) => {
  const user = req.args[0].user;

  if (user.kind !== UserKindEnum.Athlete) {
    throwForbidden();
    return;
  }

  return user;
});

export const Coach = createParamDecorator((appType: TAppType, req) => {
  const user = req.args[0].user;

  if (
    ![UserKindEnum.Coach, UserKindEnum.Assistant].includes(user.kind) ||
    (appType && appType !== req.args[0].appType)
  ) {
    throwForbidden();
    return;
  }

  return user;
});

export const UserId = createParamDecorator((_, req) => {
  return req.args[0].userId;
});

export const UserAccessToken = createParamDecorator((_, req) => {
  return req.args[0].accessToken;
});

export const Workspace = createParamDecorator((_, req) => {
  return req.args[0].workspace;
});

export const WorkspaceId = createParamDecorator((_, req) => {
  return req.args[0].workspaceId;
});
