// app/routes/login.js

import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    signInViaGithub: function(){
      var route = this,
          controller = this.controllerFor('login');
      // The provider name is passed to `open`

      this.get('torii').open('github-oauth2').then(function(){
        route.transitionTo('/');
      }, function(error){
        controller.set('error', 'Could not sign you in: '+error.message);
      });
    }
  }
});
