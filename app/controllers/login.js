// app/controllers/login.js
import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  actions: {
     login(){
       this.get("session").login()
        this.transitionToRoute('/');
     }
   }
});
