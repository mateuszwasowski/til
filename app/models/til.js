import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),
  author: DS.belongsTo('author'),
  votes: DS.hasMany('vote')
});
