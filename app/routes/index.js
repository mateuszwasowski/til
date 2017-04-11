import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),

  model() {
    return this.store.findAll('til');
  },

  actions: {
    createTil(til, desc) {
        let newTil = this.store.createRecord('til', { description: desc });
        this.store.findRecord('author', this.get("session").currentUser.id).then(author => {
          newTil.set('author', author);
          newTil.save();
        });
    },
    logout(){
      this.get("session").logout()
      this.transitionToRoute('/login')
    }
  }
});
