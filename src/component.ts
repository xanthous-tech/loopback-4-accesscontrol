import {Component, ProviderMap} from '@loopback/core';

import {AccessBindings} from './keys';

import {
  AccessMetadataProvider,
  AccessGuardProvider,
  AccessActionProvider,
} from './providers';

export class AccessComponent implements Component {
  providers?: ProviderMap = {
    [AccessBindings.METADATA.key]: AccessMetadataProvider,
    [AccessBindings.ACCESS.key]: AccessActionProvider,
    [AccessBindings.GUARD.key]: AccessGuardProvider,
  };
}
