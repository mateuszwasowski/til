import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),

  model() {
    return this.store.findAll('til');
  },

  actions: {
    createTil(til, desc) {
      var myman;
      this.store.findRecord('author', 3).then(author => {
         myman = author;
       });

       debugger;
    //  return this.store.createRecord('til', { description: desc, author: author})
      const newTil = this.store.createRecord('til', { description: desc, author: myman });
      newTil.save();
    }
  }
});
