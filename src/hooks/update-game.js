// const errors = require('feathers-errors');

const JOIN_GAME = 'JOIN_GAME';
const GUESS = 'GUESS';

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function joinGame (hook) {
    return hook.app.service('games').get(hook.id)
      .then((game) => {
        const { type, payload } = hook.data;
        const { user } = hook.params;

        switch(type) {
          case JOIN_GAME : {
            // if (game.isNotJoinableBy(user)) {
            //   throw new errors.Forbidden('This game is no longer joinable!');
            // }

            hook.data = { '$addToSet': { playerIds: user._id } };
            return hook;
          }

          case GUESS : {
            hook.data = { '$push': { guesses: payload } };
            // console.log(hook);
            // if (!game.hasJoined(user)) {
            //   throw new errors.Forbidden('You are not a player in this game, sorry!');
            // }

            // const guessRight = game.checkGuess(user, payload);
            // if (guessRight) user.score = game.time;
            //
            // hook.data = {
            //   guesses: game.guesses.concat({playerId: user._id, guess: payload}),
            // };

            return hook;
          }

          default :
            return Promise.resolve(hook);
        }
      });
  };
};
