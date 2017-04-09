//services/session.js
import Ember from 'ember';
import Cookies from 'ember-cli-js-cookie';

export default Ember.Service.extend({
  currentUser: null,
  torii: Ember.inject.service(),
  ajax: Ember.inject.service(),
  store: Ember.inject.service(),
  login(){
      this.get('torii').open('github').then(data => {
        this.set('currentUser', data.author);
        Cookies.set('author', data.author);
      });
  },
  logout(){
    this.set('currentUser', null);
  }
});
