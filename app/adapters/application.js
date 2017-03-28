import DS from 'ember-data';
import Config from 'til/config/environment';

export default DS.JSONAPIAdapter.extend({
  host: "https://api-til.herokuapp.com",
});
