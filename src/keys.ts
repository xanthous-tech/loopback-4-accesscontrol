import {MetadataAccessor, BindingKey} from '@loopback/core';

import {AccessMetadata, Roles, GuardBuilder, AccessAction} from './types';

export namespace AccessBindings {
  export const ROLES = BindingKey.create<Roles>('accesscontrol.roles-action');

  export const GUARD = BindingKey.create<GuardBuilder>(
    'accesscontrol.guard-action',
  );

  export const ACCESS = BindingKey.create<AccessAction>(
    'accesscontrol.access-action',
  );

  export const METADATA = BindingKey.create<AccessMetadata | undefined>(
    'accesscontrol.operation-metadata',
  );
}

export const ACCESS_METADATA_KEY = MetadataAccessor.create<
  AccessMetadata,
  MethodDecorator
>('accesscontrol.operations-metadata');
