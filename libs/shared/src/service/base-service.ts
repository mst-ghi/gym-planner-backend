import { Global, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { errorLogger } from '../helpers';
import { UserSelect } from '../models';

import {
  PrismaService,
  RequestContext,
  throwBadRequest,
  throwForbidden,
  throwInternalServerError,
  throwInvalidToken,
  throwLimitedUnAuthorized,
  throwMethodNotAllowed,
  throwNotFound,
  throwServiceUnAvailable,
  throwUnAuthorized,
  throwUnprocessableEntity,
} from '@app/toolkit';

@Global()
@Injectable()
export class BaseService {
  @Inject(ConfigService)
  protected configs: ConfigService;

  @Inject(PrismaService)
  protected prisma: PrismaService;

  forbiddenException(message?: string) {
    throwForbidden(message);
  }

  unAuthorizedException(message?: string) {
    throwUnAuthorized(message);
  }

  limitedUnAuthorizedException(message?: string) {
    throwLimitedUnAuthorized(message);
  }

  badRequestException(message?: string) {
    throwBadRequest(message);
  }

  notFoundException(message?: string) {
    throwNotFound(message);
  }

  methodNotAllowedException(message?: string) {
    throwMethodNotAllowed(message);
  }

  internalServerErrorException(message?: string) {
    throwInternalServerError(message);
  }

  serviceUnAvailableException(message?: string) {
    throwServiceUnAvailable(message);
  }

  unprocessableEntityException(fields: string[], message?: string) {
    const errors = [];
    for (const field of fields) {
      errors.push({ field, message });
    }
    throwUnprocessableEntity(errors);
  }

  invalidTokenException(message?: string) {
    throwInvalidToken(message);
  }

  catchError(error: any, ctx = 'Service') {
    errorLogger(error.message, ctx);
    this.internalServerErrorException();
  }

  async _headers() {
    return await RequestContext.currentHeaders;
  }

  async _request(): Promise<any> {
    return await RequestContext.currentRequest;
  }

  async _user(): Promise<IUser> {
    return await RequestContext.currentUser;
  }

  async _userId(): Promise<string> {
    return (await this._user()).id;
  }

  async _workspace(): Promise<IWorkspace> {
    return await RequestContext.currentWorkspace;
  }

  async _workspaceId(): Promise<string> {
    return (await this._workspace()).id || null;
  }

  async _isCoach(): Promise<boolean> {
    return await RequestContext.isCoach;
  }

  async _isAthlete(): Promise<boolean> {
    return await RequestContext.isAthlete;
  }

  async findAndThrowByIds(
    args: { model: string; id?: string; ids?: string[]; field: string; message: string }[],
    throwable = true,
  ) {
    let foundModels = [];
    let notFoundModels = [];

    for (let index = 0; index < args.length; index++) {
      const { model, id, ids, field, message } = args[index];

      if (id || (ids && ids[0])) {
        let row;
        let flag = true;

        if (id) {
          row = await this.prisma[model].findFirst({ where: { id } });
          if (!row) {
            flag = false;
          }
        } else if (ids[0]) {
          row = await this.prisma[model].findMany({ where: { id: { in: ids } } });
          if (!row || row.length !== ids.length) {
            flag = false;
          }
        }

        if (flag) {
          foundModels.push(row);
        } else {
          notFoundModels.push({ field, message });
        }
      }
    }

    if (throwable && notFoundModels[0]) {
      const errors = [];
      for (const obj of notFoundModels) {
        errors.push(obj);
      }
      throwUnprocessableEntity(errors);
    }

    return foundModels;
  }

  async findRawById<T>(model: string, modelId: string, throwable = true, field?: string): Promise<T> {
    const row = await this.prisma[model].findFirst({ where: { id: modelId } });

    if (!row && throwable) {
      if (field) {
        this.unprocessableEntityException([field]);
      } else {
        this.notFoundException();
      }
    }

    return row;
  }

  async findRawByIds<T>(model: string, modelIds: string[], throwable = true, field?: string): Promise<T[]> {
    const row = await this.prisma[model].findFirst({ where: { id: { in: modelIds } } });

    if (!row && throwable) {
      if (field) {
        this.unprocessableEntityException([field]);
      } else {
        this.notFoundException();
      }
    }

    return row;
  }

  async findUserById(userId: string, throwable = true, field?: string) {
    const user = await this.prisma.user.findFirst({
      where: { id: userId },
      select: UserSelect,
    });

    if (!user && throwable) {
      if (field) {
        this.unprocessableEntityException([field]);
      } else {
        this.notFoundException();
      }
    }

    return user;
  }
}
