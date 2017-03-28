import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('til');
  },

  actions: {
    createTil(til, desc) {
      var author = this.store.peekRecord('author', 1);
    //  return this.store.createRecord('til', { description: desc, author: author})
      const newTil = this.store.createRecord('til', { description: desc, author: author});
      newTil.save();
    }
  }
});
