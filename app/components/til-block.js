import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  actions: {
    vote(til_id){
      const store = this.get("store");
      let newVote = store.createRecord('vote', {});
      store.findRecord('til', til_id).then((til) => {
        store.findRecord('author', this.get("session").authorId).then(author => {
          newVote.set('author', author);
          newVote.set('til', til);
          newVote.save();
        });
      });
    },
  }
});
