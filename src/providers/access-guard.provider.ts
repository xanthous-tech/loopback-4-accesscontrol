import {ValueOrPromise, Provider} from '@loopback/context';
import {GuardBuilder} from '../types';

const grants = [
  {role: 'member', resource: 'bot', action: 'create:any', attributes: '*'},
  {role: 'member', resource: 'bot', action: 'read:any', attributes: '*'},
  {role: 'member', resource: 'bot', action: 'update:any', attributes: '*'},
  {role: 'member', resource: 'bot', action: 'delete:any', attributes: '*'},

  {role: 'member', resource: 'tag', action: 'create:any', attributes: '*'},
  {role: 'member', resource: 'tag', action: 'read:any', attributes: '*'},
  {role: 'member', resource: 'tag', action: 'update:any', attributes: '*'},
  {role: 'member', resource: 'tag', action: 'delete:any', attributes: '*'},

  {role: 'member', resource: 'botrule', action: 'create:any', attributes: '*'},
  {role: 'member', resource: 'botrule', action: 'read:any', attributes: '*'},
  {role: 'member', resource: 'botrule', action: 'update:any', attributes: '*'},
  {role: 'member', resource: 'botrule', action: 'delete:any', attributes: '*'},

  {role: 'member', resource: 'tenant', action: 'create:any', attributes: '*'},
  {role: 'member', resource: 'tenant', action: 'read:any', attributes: '*'},
  {role: 'member', resource: 'tenant', action: 'update:any', attributes: '*'},
  {role: 'member', resource: 'tenant', action: 'delete:any', attributes: '*'},

  {role: 'member', resource: 'contact', action: 'create:any', attributes: '*'},
  {role: 'member', resource: 'contact', action: 'read:any', attributes: '*'},
  {role: 'member', resource: 'contact', action: 'update:any', attributes: '*'},
  {role: 'member', resource: 'contact', action: 'delete:any', attributes: '*'},

  {role: 'member', resource: 'room', action: 'create:any', attributes: '*'},
  {role: 'member', resource: 'room', action: 'read:any', attributes: '*'},
  {role: 'member', resource: 'room', action: 'update:any', attributes: '*'},
  {role: 'member', resource: 'room', action: 'delete:any', attributes: '*'},

  {role: 'admin', resource: 'bot', action: 'create:any', attributes: '*'},
  {role: 'admin', resource: 'bot', action: 'read:any', attributes: '*'},
  {role: 'admin', resource: 'bot', action: 'update:any', attributes: '*'},
  {role: 'admin', resource: 'bot', action: 'delete:any', attributes: '*'},

  {role: 'admin', resource: 'botrule', action: 'create:any', attributes: '*'},
  {role: 'admin', resource: 'botrule', action: 'read:any', attributes: '*'},
  {role: 'admin', resource: 'botrule', action: 'update:any', attributes: '*'},
  {role: 'admin', resource: 'botrule', action: 'delete:any', attributes: '*'},

  {role: 'admin', resource: 'tenant', action: 'create:any', attributes: '*'},
  {role: 'admin', resource: 'tenant', action: 'read:any', attributes: '*'},
  {role: 'admin', resource: 'tenant', action: 'update:any', attributes: '*'},
  {role: 'admin', resource: 'tenant', action: 'delete:any', attributes: '*'},

  {role: 'admin', resource: 'contact', action: 'create:any', attributes: '*'},
  {role: 'admin', resource: 'contact', action: 'read:any', attributes: '*'},
  {role: 'admin', resource: 'contact', action: 'update:any', attributes: '*'},
  {role: 'admin', resource: 'contact', action: 'delete:any', attributes: '*'},

  {role: 'admin', resource: 'room', action: 'create:any', attributes: '*'},
  {role: 'admin', resource: 'room', action: 'read:any', attributes: '*'},
  {role: 'admin', resource: 'room', action: 'update:any', attributes: '*'},
  {role: 'admin', resource: 'room', action: 'delete:any', attributes: '*'},

  {role: 'admin', resource: 'tag', action: 'create:any', attributes: '*'},
  {role: 'admin', resource: 'tag', action: 'read:any', attributes: '*'},
  {role: 'admin', resource: 'tag', action: 'update:any', attributes: '*'},
  {role: 'admin', resource: 'tag', action: 'delete:any', attributes: '*'},

  {role: 'admin', resource: 'permission', action: 'read:any', attributes: '*'},
  {
    role: 'admin',
    resource: 'permission',
    action: 'create:any',
    attributes: '*',
  },
  {
    role: 'admin',
    resource: 'permission',
    action: 'delete:any',
    attributes: '*',
  },
];

export class AccessGuardProvider implements Provider<GuardBuilder> {
  // TODO: ask user to provide a list of roles!
  constructor() {}

  value(): ValueOrPromise<GuardBuilder> {
    return new GuardBuilder(grants);
  }
}
