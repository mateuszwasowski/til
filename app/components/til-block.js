import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  actions: {
    vote(til_id){
      const store = get(this, 'store');
      store.findRecord('til', til_id).then((til) => {
        store.findRecord('author', get(this, 'session.authorId')).then(author => {
          const newVote = store.createRecord('vote', {
            til: til,
            author: author,
          });
          newVote.save();
        });
      });
    },
  }
});
