import {
  MethodDecoratorFactory,
  Constructor,
  MetadataInspector,
} from '@loopback/core';

import {AccessMetadata} from './types';
import {ACCESS_METADATA_KEY} from './keys';

/**
 * Mark a controller method for access control.
 */
export function access(...options: AccessMetadata[]) {
  return MethodDecoratorFactory.createDecorator<AccessMetadata[]>(
    ACCESS_METADATA_KEY,
    options,
  );
}

/**
 * Fetch access metadata stored by `@access` decorator.
 */
export function getAccessMetadata(
  controllerClass: Constructor<{}>,
  methodName: string,
): AccessMetadata[] | undefined {
  return MetadataInspector.getMethodMetadata<AccessMetadata[]>(
    ACCESS_METADATA_KEY,
    controllerClass.prototype,
    methodName,
  );
}
