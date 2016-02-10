import Ember from 'ember';
import layout from '../templates/components/simple-form';
import BufferedProxy from 'ember-buffered-proxy/proxy';

export default Ember.Component.extend({
  layout,
  tagName: 'form',

  formValues: null,

  didReceiveAttrs() {
    this._super(...arguments);
    let startingValues = this.getAttr('startingValues') || {};
    let formValues = BufferedProxy.create({content: startingValues});

    this.set('formValues', formValues);
  },

  resetForm() {
    this.get('formValues').discardBufferedChanges();
  },

  submit(ev) {
    ev.preventDefault();

    this.sendAction('onsubmit', this.get('formValues.buffer'), this.resetForm.bind(this));
  },
});
