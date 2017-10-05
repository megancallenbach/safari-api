// games-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

class GameClass {

  checkGuess(user, guess) {
    return (guess === this.image.word)? true : false;
  }

  isNotJoinableBy(user) {
    return !this.isJoinableBy(user);
  }

  isJoinableBy(user) {
    return this.isJoinable() && !this.hasJoined(user);
  }

  hasJoined(user) {
    this.playerIds.includes(user._id);
  }

  isJoinable() {
    return !this.isFull() && !this.isStarted();
  }

  isFull() {
    return this.playerIds.length > 2;
  }

  isStarted() {
    return this.started;
  }
}


module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const guessSchema = new Schema({
    player: { type: mongooseClient.Schema.Types.ObjectId, ref: 'users' },
    guess: { type: String }
  });

  const scoreSchema = new Schema({
    playerId: { type: mongooseClient.Schema.Types.ObjectId, ref: 'users' },
    score: { type: Number }
  });

  const games = new mongooseClient.Schema({
    title: { type: String, required: true },
    started: { type: Boolean },
    time: { type: Number },
    round: { type: Number },
    playerIds: [{ type: mongooseClient.Schema.Types.ObjectId, ref: 'users' }],
    scores: [scoreSchema],
    animal: { type: String },
    guesses: [guessSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  games.loadClass(GameClass);
  return mongooseClient.model('games', games);
};
