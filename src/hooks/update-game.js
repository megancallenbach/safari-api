const errors = require('feathers-errors');

const JOIN_GAME = 'JOIN_GAME';
const GUESS = 'GUESS';

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function joinGame (hook) {
    hook.app.service('games').get(hook.id)
      .then((game) => {
        const { type, payload } = hook.data;
        const { user } = hook.params;

        switch(type) {
          case JOIN_GAME : {
            if (game.isNotJoinableBy(user)) {
              throw new errors.Forbidden('This game is no longer joinable!');
            }

            hook.data = {
              playerIds: game.playerIds.concat(user._id)
            };

            return hook;
          }

          case GUESS : {
            if (!game.hasJoined(user)) {
              throw new errors.Forbidden('You are not a player in this game, sorry!');
            }

            if (!game.hasTurn(user)) {
              throw new errors.Forbidden('It\'s not your turn. Whoops!');
            }

            const guessRight = game.checkGuess(user, payload);

            hook.data = {
              guesses: game.guesses.concat(payload),
            };

            if (!guessRight) {
              hook.data.currentPlayerIndex = game.nextPlayerIndex();
            }

            return hook;
          }

          default :
            return Promise.resolve(hook);
        }
      });
  };
};
