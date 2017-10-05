// games-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const GameClass =  require('./games.class');


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
    players: [{ type: mongooseClient.Schema.Types.ObjectId, ref: 'users' }],
    scores: [scoreSchema],
    winnerId: { type: Schema.Types.ObjectId, ref: 'users' },
    animal: { type: String, required: true },
    guesses: [guessSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  games.loadClass(GameClass);
  return mongooseClient.model('games', games);
};
