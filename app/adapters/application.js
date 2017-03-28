import DS from 'ember-data';
import config from 'til/config/environment';

export default DS.JSONAPIAdapter.extend({
  host: config.apiHost,
});
