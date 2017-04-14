import Ember from 'ember';
import Cookies from 'ember-cli-js-cookie';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  beforeModel() {
    console.log('index!!');
    if(!Cookies.get('authorId')){
      this.transitionTo('/login');
    }
  },
  model() {
    return this.store.findAll('til');
  },

  actions: {
    createTil(til, desc) {
        let newTil = this.store.createRecord('til', { description: desc });
        this.store.findRecord('author', this.get("session").authorId).then(author => {
          newTil.set('author', author);
          newTil.save();
        });
    },
    logout(){
      this.get("session").logout();
      this.transitionToRoute('/login');
    }
  }
});
