//controllers/application.js
import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  actions: {
    logout(){
      //todo
      this.get("session").logout();
      this.transitionToRoute('/login');
    }
  }
});
