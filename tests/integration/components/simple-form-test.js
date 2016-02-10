import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('simple-form', 'Integration | Component | simple form', {
  integration: true
});

test('it renders', function(assert) {
  // Template block usage:" + EOL +
  this.render(hbs`
    {{#simple-form}}
      template block text
    {{/simple-form}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

test('it renders with starting values', function(assert) {
  this.set('model', {firstName: 'Wow', lastName: 'Such Doge'});

  this.render(hbs`
    {{#simple-form startingValues=model as |formValues|}}
      {{input value=formValues.firstName name="firstName"}}
      {{input value=formValues.lastName name="lastName"}}
      <button>Submit</button>
    {{/simple-form}}
  `);

  var firstName = this.$('input').eq(0).val();
  var lastName = this.$('input').eq(1).val();

  assert.equal(firstName, 'Wow');
  assert.equal(lastName, 'Such Doge');
});

test('it captures user input', function(assert) {
  this.on('captureEvent', captureEvent);

  this.render(hbs`
    {{#simple-form onsubmit="captureEvent" as |formValues|}}
      {{input value=formValues.firstName name="firstName"}}
      {{input value=formValues.lastName name="lastName"}}
      <button>Submit</button>
    {{/simple-form}}
  `);

  this.$('input').eq(0).val('Tom');
  this.$('input').eq(1).val('Dale');
  this.$('input').change();
  this.$('button').click();

  function captureEvent(formValues) {
    assert.deepEqual(formValues, {firstName: 'Tom', lastName: 'Dale'});
  }
});

test('it only captures changed input', function(assert) {
  this.on('captureEvent', captureEvent);
  this.set('model', {firstName: 'Wow', lastName: 'Such Doge'});

  this.render(hbs`
    {{#simple-form onsubmit="captureEvent" as |formValues|}}
      {{input value=formValues.firstName name="firstName"}}
      {{input value=formValues.lastName name="lastName"}}
      <button>Submit</button>
    {{/simple-form}}
  `);

  this.$('input').eq(0).val('Tom');

  this.$('input').eq(0).change();
  this.$('button').click();

  function captureEvent(formValues) {
    assert.deepEqual(formValues, {firstName: 'Tom'});
  }
});

test('it can reset the form', function(assert) {
  Ember.run(() => {
    this.on('captureEvent', captureEvent);
    this.set('model', {firstName: 'Wow', lastName: 'Such Doge'});

    this.render(hbs`
      {{#simple-form onsubmit=(action "captureEvent") as |formValues resetForm|}}
        {{input value=formValues.firstName name="firstName"}}
        {{input value=formValues.lastName name="lastName"}}
        <button>Submit</button>
      {{/simple-form}}
    `);

    const $ = this.$;
    const input = $('input');
    input.eq(0).val('Tom');

    input.eq(0).change();
    $('button').click();

    function captureEvent(formValues, resetForm) {
      assert.deepEqual(formValues, {firstName: 'Tom'});
      resetForm();
    }
  });
});
