import {CoreBindings} from '@loopback/core';
import {ValueOrPromise, Provider, inject} from '@loopback/context';

import {GuardBuilder, AccessControlOptions} from '../types';

export class AccessGuardProvider implements Provider<GuardBuilder> {
  constructor(
    @inject(`${CoreBindings.APPLICATION_CONFIG}#accesscontrol`)
    private config: AccessControlOptions,
  ) {}

  value(): ValueOrPromise<GuardBuilder> {
    return new GuardBuilder(this.config.grants);
  }
}
