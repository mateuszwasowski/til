//services/session.js
import Ember from 'ember';
import Cookies from 'ember-cli-js-cookie';

export default Ember.Service.extend({
  currentUser: null,
  torii: Ember.inject.service(),
  ajax: Ember.inject.service(),
  store: Ember.inject.service(),
  login(){
      return this.get('torii').open('google').then(data => {
        Cookies.set('authorId', data.author.data.id);
        this.initializeFromCookie();
      });
  },
  logout(){
    this.set("authorId", null);
    Cookies.remove('authorId');
  },
  init(){
    this._super(...arguments);
    this.initializeFromCookie();
  },
  initializeFromCookie(){
    var authorId = Cookies.get('authorId')
    console.log("author id is:");
    console.log(authorId);
    if(!!authorId){
      this.set('authorId', authorId);
    }
  },
});
