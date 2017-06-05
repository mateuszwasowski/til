import DS from 'ember-data';

export default DS.Model.extend({
  til:  DS.belongsTo('til'),
  author: DS.belongsTo('author')
});
