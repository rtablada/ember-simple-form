# Ember-simple-form

[![npm version](https://badge.fury.io/js/ember-simple-form.svg)](http://badge.fury.io/js/ember-simple-form)
[![Ember Observer Score](http://emberobserver.com/badges/ember-simple-form.svg)](http://emberobserver.com/addons/ember-simple-form)

Ember Simple Form is a basic component for decoupling your form data from it's original source.
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
{{#simple-form onsubmit="login" as |formValues|}}
  {{input value=formValues.username placeholder="Username"}}
  {{input type="password" value=formValues.username placeholder="Password"}}

  <button>Submit</button>
{{/simple-form}}
```

Let's set the form to start with a default username of "admin".
Initial values can be set using the `startingValues` attribute:

```hbs
{{#simple-form startingValues=(hash username="admin") onsubmit="login" as |formValues|}}
  {{input value=formValues.username placeholder="Username"}}
  {{input type="password" value=formValues.username placeholder="Password"}}

  <button>Submit</button>
{{/simple-form}}
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
