# loopback-4-accesscontrol

This is a very simple wrapper around https://github.com/onury/accesscontrol.
Currently, it is missing most of the functionality from this package. Any feature requests are welcome!

## Getting Started

Here are some steps to get started using this extension. There is also an example app in [this repository](https://github.com/xanthous-tech/loopback-4-playground)

```
npm install --save loopback-4-accesscontrol
```

1) Add access role provider.
``` typescript
import {Roles} from 'loopback-4-accesscontrol';
import {ValueOrPromise, Provider} from '@loopback/context';

export class AccessRolesProvider implements Provider<Roles> {
  constructor() {}

  value(): ValueOrPromise<Roles> {
    return () => {
      /**
       * Here we should check for users permission.
       * In a real application we can calculate user roles
       * by querying the database.
       */
      return ['guest', 'admin'];
    };
  }
}
```

2) Add `AccessComponent` to app components and bind role provider to application context.
``` typescript
// in src/index.ts
import {AccessBindings, AccessComponent} from 'loopback-4-accesscontrol';
import {AccessRolesProvider} from './providers';

export async function main(options: ApplicationConfig = {}) {
  // ... DEDUCTED
  app.component(AccessComponent);
  app.bind(AccessBindings.ROLES).toProvider(AccessRolesProvider);

  await app.start();
  return app;
}
```

3) Modify rest sequence to make an access control check on each request.
``` typescript
export class RestSequence implements SequenceHandler {
  constructor(
    @inject(AccessBindings.ACCESS) protected accessAction: AccessAction,
    // ... DEDUCTED
  ) {}

  async handle(context: RequestContext) {
    // ... DEDUCTED

    if (!(route instanceof StaticAssetsRoute)) {
      /**
       * Here we include access action. This will let us
       * check access level of the user on each request.
       */
      await this.accessAction(request);
    }

    const result = await this.invoke(route, args);
    this.send(response, result);
  }

  // ... DEDUCTED
}
```

4) Add access control options to applicaion config.
``` typescript
// in src/index.ts

export async function main(options: ApplicationConfig = {}) {
  /**
   * Here we can pass application options into loopback.
   */
  options = Object.assign({}, options, {
    accesscontrol: {
      grants: [
        {
          role: 'guest',
          action: 'read:any',
          attributes: '*',
          resource: 'plant',
        },
        {
          role: 'admin',
          action: 'create:any',
          attributes: '*',
          resource: 'plant',
        },
      ],
    }
  });
  const app = new LoopbackPlaygroundApplication(_options);

  // ... DEDUCTED
}
```

5) And finally use `access` decorator to mark a controller for access check.
``` typescript
import {access} from 'loopback-4-accesscontrol';

export class PlantController {
  // ... DEDUCTED

  /**
   * We are defining the resource and the action thats being
   * taken by this CRUD method.
   */
  @access({
    action: 'read',
    resource: 'plant',
  })
  @get('/plants', {
    operationId: 'getPlants',
    description: '{getPlants} -- list all plants',
    responses: {
      '200': {
        description: 'Array of plants in plant database',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Plant}},
          },
        },
      },
    },
  })
  async find(): Promise<Plant[]> {
    return this.plantRepository.find();
  }

  // ... DEDUCTED
}
```

[![LoopBack](https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)
