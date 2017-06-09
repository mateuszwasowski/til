import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  session: Ember.inject.service(),
  hasVote: Ember.computed('til.votes', function(){
    const votes_promise = this.get('til.votes');
    const author_id = this.get("session").authorId;
    return votes_promise.then(votes_relationship =>  {
      const votes = votes_relationship.toArray();
      return votes.some(vote => {
        return vote.belongsTo('author').id() == author_id;
      });
    });
  }),
  actions: {
    vote(til_id){
      const store = this.get('store');
      store.findRecord('til', til_id).then(til => {
        store.findRecord('author', this.get("session").authorId).then(author => {
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
