import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  actions: {
    vote(til_id){
      let newVote = this.get('store').createRecord('vote', {til_id: til_id});
      this.get('store').findRecord('author', this.get("session").authorId).then(author => {
        newVote.set('author', author);
        newVote.save();
      });
    },
  }
});
