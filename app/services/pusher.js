import Ember from 'ember';
import config from 'til/config/environment';

const { computed, run } = Ember;

export default Ember.Service.extend({
  store: Ember.inject.service(),
  listenForTils(refreshFunction) {
    if (this.get('hasSubscribedToTils')) {
      return;
    }

    this.subscribe(`tils`, "objectsUpdated", (data) => {
      run.scheduleOnce('afterRender', this, refreshFunction, data);
    });

    this.set('hasSubscribedToTils', true);
  },

  subscribe(channelName, event, callback) {
    const channel = this.get('_client').subscribe(channelName);
    channel.bind(event, callback);
    channel.bind('pusher:subscription_succeeded', (data) => {
      this.get('store').findAll('til');
    });
  },

  _pushPayload(data) {
    this.get('store').pushPayload(data);
  },

  _client: computed(function() {
    Pusher.logToConsole = true;

    return new Pusher(config.pusher.key, { cluster: 'eu', encrypted: true });
  })
});
