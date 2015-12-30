import Ember from 'ember';
import layout from '../templates/components/simple-form';
const {copy} = Ember;

export default Ember.Component.extend({
  layout,
  tagName: 'form',

  formValues: null,

  didReceiveAttrs() {
    this._super(...arguments);
    let startingValues = this.getAttr('startingValues') || {};
    let formValues;

    // Because Ember Model's Don't Implement Copyable
    if (startingValues.toJSON) {
      formValues = startingValues.toJSON();
    } else {
      formValues = copy(startingValues);
    }

    this.set('formValues', formValues);
  },

  submit(ev) {
    ev.preventDefault();

    this.sendAction('onsubmit', this.get('formValues'));
  },
});
