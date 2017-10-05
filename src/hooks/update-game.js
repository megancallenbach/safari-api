// const errors = require('feathers-errors');

const JOIN_GAME = 'JOIN_GAME';
const GUESS = 'GUESS';
const START_GAME = 'START_GAME';


function comparableObjectId(objectId) {
  return objectId.toString();
}


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

          case START_GAME : {
            const allReadyPlayers = game.readyPlayers.concat(user._id).map(comparableObjectId);
            const allPlayers = game.playerIds.map(comparableObjectId);

              if (allReadyPlayers.length > 1 && allReadyPlayers.sort().join(',') === allPlayers.sort().join(',')) {
                hook.data = { readyPlayers: game.readyPlayers.concat(user._id),
                              started: true };
                return hook;
              }
              else {
                hook.data = { '$addToSet': { readyPlayers: user._id } };
                return hook;
              }
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
