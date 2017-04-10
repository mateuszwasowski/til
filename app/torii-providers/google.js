import Ember from 'ember';
import GoogleOauth2Provider from 'torii/providers/google-oauth2';
import ENV from "til/config/environment"; //TODO move serverUrl to env

export default GoogleOauth2Provider.extend({
  ajax: Ember.inject.service(),
  fetch(data) {
    return data;
  },
  open() {
    return this._super().then((toriiData) => {
      const authCode = toriiData.authorizationCode;
      const serverUrl =  `http://localhost:3000/google_auth?code=${authCode}&redirect_uri=`;
      return this.get('ajax').request(serverUrl)
        .then((data) => {
          toriiData.author = data;
          return toriiData;
        });
    });
  }
});
