//services/session.js
import Ember from 'ember';
import Cookies from 'ember-cli-js-cookie';

export default Ember.Service.extend({
  currentUser: null,
  torii: Ember.inject.service(),
  ajax: Ember.inject.service(),
  store: Ember.inject.service(),
  login(){
      return this.get('torii').open('github').then(data => {
        Cookies.set('authenticationToken', data.accessToken);
        return this.get('ajax').request(`https://api.github.com/user`);
      }).then(user => {
        return Ember.$.ajax({
          method: "POST",
          url: `${ENV.host}/users`,
          data: {
            login: user.login,
            email: user.email,
            name: user.name,
            authentication_token: Cookies.get('authenticationToken'),
            avatar_url: user.avatar_url,
            github_id: user.id
          }
        });
      }).then( user =>{
        Cookies.set('userId', user.user_id);
        this.initializeFromCookie();
      });
  },
  logout(){
    this.set('currentUser', null);
  }
});
