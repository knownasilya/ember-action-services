ember-action-services
==============================================================================

Action services contain immutable state and actions that mutate that state

💡 If you have ideas for the direction of this addon, please open an issue. I'd love to hear your thoughts!

Installation
------------------------------------------------------------------------------

```
ember install ember-action-services
```


Usage
------------------------------------------------------------------------------

Action services let you share actions and state across multiple components and controller/template combos in a safe way.

An action service defines immutable state, which can only be modified by calling `setState` on that service. The developer then creates actions on that service, and modify the state using `setState`. Note that async actions work using `async/await`.

### Setup Action Service

Create a new service using `ember g service <name>`. Then modify the created
file to look something like this:

```js
import { ActionService } from 'ember-action-services';

export default ActionService.extend({
  /*
    This is optional, but if not set the default state is an empty object.
    This could also be the place you bring back state from localStorage or something similar.
  */
  initState() {
    return {
      test: {
        name: 'hi'
      }
    };
  },
  
  actions: {
    duplicate() {
      /*
        `pluckState` is provided by ActionService and takes 1 or more keys as arguments, e.g. `this.pluckState('cloneUser', 'test')` will return  `{ cloneUser, test }` object.
      */
      let { cloneUser } = this.pluckState('cloneUser');

      cloneUser = cloneUser ? cloneUser + 1 : 1;

      /*
        `setState` is also provided by ActionService and takes an object that is merged with the existing state.
      */
      this.setState({ cloneUser });
    },
    
    setName() {
      this.setState({
        test: {
          name: 'good bye'
        }
      });
    }
  }
});
```

Not the use of `ActionService` rather then the default `Ember.Service`.

### Using Action Service

To call actions on an action service, you would first inject
that service where you need it. For example:

```js
import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  userStateService: service('user-state')
});
```

Then you can use that service in your template:

```hbs
<button type='button' onclick={{action 'duplicate' target=userStateService}}>Duplicate User</button>
```

To access state data, you can do so via normal Ember conventions under the `state` path under that service, e.g.

```hbs
User was cloned {{userStateService.state.cloneUser}} times.
```


Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd ember-action-services`
* `npm install`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
