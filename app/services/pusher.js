import Ember from 'ember';
import config from 'til/config/environment';

const { computed, run } = Ember;

export default Ember.Service.extend({
  store: Ember.inject.service(),
  listenForTils() {
    if (this.get('hasSubscribedToTils')) {
      return;
    }

    this.subscribe(`tils`, "objectsUpdated", (data) => {
      run.scheduleOnce('afterRender', this, this._pushPayload, data);
    });

    this.set('hasSubscribedToTils', true);
  },

  subscribe(channelName, event, callback) {
    const channel = this.get('_client').subscribe(channelName);
    channel.bind(event, callback);
  },

  _pushPayload(data) {
    this.get('store').pushPayload(data);
  },

  _client: computed(function() {
    Pusher.logToConsole = config.environment !== "production";

    return new Pusher(config.pusher.key);
  })
});
