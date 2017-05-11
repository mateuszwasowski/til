import Ember from 'ember';
import Cookies from 'ember-cli-js-cookie';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  pusher: Ember.inject.service(),
  beforeModel() {
    console.log('index!!');
    //if(!Cookies.get('authorId')){
  //    this.transitionTo('/login');
  //  }
  },
  model() {
    return this.get('pusher').listenForTils()
  },

  actions: {
    createTil(til, desc) {
        let newTil = this.store.createRecord('til', { description: desc });
        this.store.findRecord('author', 5).then(author => {
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
