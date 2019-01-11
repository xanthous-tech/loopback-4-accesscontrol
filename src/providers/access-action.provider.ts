import {IQueryInfo} from 'accesscontrol';
import {Request, HttpErrors} from '@loopback/rest';
import {inject, Getter, Provider} from '@loopback/context';

import {AccessBindings} from '../keys';
import {AccessAction, Roles, GuardBuilder, AccessMetadata} from '../types';

export class AccessActionProvider implements Provider<AccessAction> {
  constructor(
    @inject.getter(AccessBindings.ROLES)
    readonly getRoles: Getter<Roles>,
    @inject.getter(AccessBindings.GUARD)
    readonly getGuard: Getter<GuardBuilder>,
    @inject.getter(AccessBindings.METADATA)
    readonly getMetadata: Getter<AccessMetadata[]>,
  ) {}

  value(): AccessAction {
    return (request: Request) => this.action(request);
  }

  async action(request: Request): Promise<void> {
    const guard = await this.getGuard();
    const rolesGetter = await this.getRoles();
    const metadata = await this.getMetadata();
    const roles = await rolesGetter();

    if (!metadata) {
      return;
    }

    metadata.forEach((query: IQueryInfo) => {
      const permission = guard.permission({
        ...query,
        role: roles,
      });

      if (!permission.granted) {
        throw new HttpErrors.Unauthorized(
          `access on ${permission.resource} is not allowed for this user`,
        );
      }
    });
  }
}
