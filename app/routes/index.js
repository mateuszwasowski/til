import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),

  model() {
    return this.store.findAll('til');
  },

  actions: {
    createTil(til, desc) {
        let user = this.store.peekRecord('author', this.get("session").currentUser.data.id);
        const newTil = this.store.createRecord('til', { description: desc, author: user });
        newTil.save();
    }
  }
});
