import { AsyncLocalStorage } from 'async_hooks';
import { Request, Response } from 'express';

export class RequestContext {
  static cls = new AsyncLocalStorage<RequestContext>();

  static get currentContext() {
    return this.cls.getStore();
  }

  static get currentRequest() {
    return this.cls.getStore().req as any;
  }

  static get currentHeaders() {
    return this.cls.getStore().req.headers;
  }

  static get currentCookies() {
    return this.cls.getStore().req.cookies;
  }

  static get currentUser() {
    return (this.cls.getStore().req as any).user as IUser;
  }

  static get currentWorkspace() {
    return (this.cls.getStore().req as any).workspace as IWorkspace;
  }

  static get isCoach() {
    return (this.cls.getStore().req as any).isCoach as boolean;
  }

  static get isAthlete() {
    return (this.cls.getStore().req as any).isAthlete as boolean;
  }

  constructor(
    public readonly req: Request,
    public readonly res: Response,
  ) {}
}
