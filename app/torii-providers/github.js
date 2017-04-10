import Ember from 'ember';
import GitHubOauth2Provider from 'torii/providers/github-oauth2';
import ENV from "til/config/environment";

export default GitHubOauth2Provider.extend({
  ajax: Ember.inject.service(),
  fetch(data) {
    return data;
  },
  open() {
    return this._super().then((toriiData) => {
      const authCode = toriiData.authorizationCode;
      const serverUrl =  `http://localhost:3000/github_auth?code=${authCode}`;
      return this.get('ajax').request(serverUrl)
        .then((data) => {
          toriiData.author = data;
          return toriiData;
        });
    });
  }
});
