import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    console.log("hello");
    return this.store.findAll('til');
  },

  actions: {
    createTil(til, desc) {
      var author = this.store.peekRecord('author', 4);
      return this.store.createRecord('til', { description: desc, author: author});
      //const newTil = this.store.createRecord('til', { description: desc, author: author});
      //newTil.save()
    }
  }
});
