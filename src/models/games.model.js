// games-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');

  const games = new mongooseClient.Schema({
    title: { type: String, required: true },
    word: { type: String, required: true },
    guesses: [String],
    players: [{ type: mongooseClient.Schema.Types.ObjectId, ref: 'users' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('games', games);
};
