import {CoreBindings} from '@loopback/core';
import {Provider, inject} from '@loopback/context';
import {Constructor} from '@loopback/context/src/value-promise';

import {getAccessMetadata} from '../decorators';
import {AccessMetadata} from '../types';

export class AccessMetadataProvider
  implements Provider<AccessMetadata[] | undefined> {
  constructor(
    @inject(CoreBindings.CONTROLLER_CLASS) private ctorClass: Constructor<{}>,
    @inject(CoreBindings.CONTROLLER_METHOD_NAME) private ctorMethod: string,
  ) {}

  value(): AccessMetadata[] | undefined {
    return getAccessMetadata(this.ctorClass, this.ctorMethod);
  }
}
