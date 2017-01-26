# Ember-simple-form

[![npm version](https://badge.fury.io/js/ember-simple-form.svg)](http://badge.fury.io/js/ember-simple-form)
[![Ember Observer Score](http://emberobserver.com/badges/ember-simple-form.svg)](http://emberobserver.com/addons/ember-simple-form)

Ember Simple Form is a basic component for decoupling your form data from it's original source.

**TLDR;** Ember Simple Form takes care of a lot of edge cases around capturing form values.


It uses Ember's `copy` method (or `.toJSON` on Ember Data models) to create an immutable copy of a set of `startingValues`.
For capturing user `submit` actions, the form copies the current values within the form and then sends an `onsubmit` action which can be listened for.

## Installation

* `npm install ember-simple-form`

## Use

To create a form without starting values:

```hbs
{{#simple-form as |formValues|}}
  {{input value=formValues.username placeholder="Username"}}
  {{input type="password" value=formValues.username placeholder="Password"}}

  <button>Submit</button>
{{/simple-form}}
```

To listen to the submit event and get all values from the form and call the `login` action:

```hbs
{{#simple-form onsubmit=(action "login") as |formValues|}}
  {{input value=formValues.username placeholder="Username"}}
  {{input type="password" value=formValues.username placeholder="Password"}}

  <button>Submit</button>
{{/simple-form}}
```

Let's set the form to start with a default username of "admin".
Initial values can be set using the `startingValues` attribute:

```hbs
{{#simple-form startingValues=(hash username="admin") onsubmit=(action "login") as |formValues|}}
  {{input value=formValues.username placeholder="Username"}}
  {{input type="password" value=formValues.username placeholder="Password"}}

  <button>Submit</button>
{{/simple-form}}
```

### Reseting the Form Values

There may be times where the form needs to be reset.
For this, as a second variable, `simple-form` yields a function to reset the form.

This could be used to add a reset button to the form above:

```htmlbars
{{#simple-form startingValues=(hash username="admin") onsubmit=(action "login") as |formValues resetForm|}}
  {{input value=formValues.username placeholder="Username"}}
  {{input type="password" value=formValues.username placeholder="Password"}}

  <button {{action resetForm}}>Reset</button>
  <button>Submit</button>
{{/simple-form}}
```

The `onsubmit` action will also send the `resetForm` function so that the form can be reset after handling submission.
For instance, the controller for the above could be:

```js
import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    login(formValues, resetForm) {
      fetch('/login', {
        method: 'POST',
        data: JSON.stringify(formValues)
      }).then((res) => res.json())
        .then(() => {
          resetForm();
        });
    },
  },
});
```

## Contributing

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
