import {Request} from '@loopback/rest';
import {AccessControl} from 'accesscontrol';

export interface AccessControlOptions {
  grants: GrantObject[];
}

/**
 * Single grant entry for accesscontrol to assert on.
 */
export interface GrantObject {
  /**
   * Role to grant permission to.
   */
  role: string;

  /**
   * Resource to grant permission for.
   */
  resource: string;

  /**
   * Resource to grant permission for.
   */
  action: string;

  /**
   * Resource to grant permission for.
   */
  attributes: string;
}

/**
 * Access control metadata stored via Reflection API
 */
export interface AccessMetadata {
  /**
   *  Indicates the resource to be queried.
   */
  resource: string;

  /**
   *  Defines the type of the operation that is (or not) to be performed on
   *  the resource by the defined role(s).
   *
   *  *values*:
   *
   * - `create`: Specifies a CREATE action to be performed on a resource.
   * For example, an HTTP POST request or an INSERT database operation.
   *
   * - `read`: Specifies a READ action to be performed on a resource.
   *  For example, an HTTP GET request or an database SELECT operation.
   *
   * - `update`: Specifies an UPDATE action to be performed on a resource.
   *  For example, an HTTP PUT or POST request or an database UPDATE operation.
   *
   * - `delete`: Specifies a DELETE action to be performed on a resource.
   *  For example, an HTTP DELETE request or a database DELETE operation.
   */
  action: 'create' | 'read' | 'update' | 'delete';
}

/**
 * Access action for sequence.
 */
export interface AccessAction {
  (request: Request): Promise<void>;
}

/**
 * Function that resolves to user roles
 */
export interface Roles {
  (): string[];
}

/**
 * A helper class to build roles.
 */
export class GuardBuilder extends AccessControl {}
