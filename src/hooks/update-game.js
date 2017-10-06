// const errors = require('feathers-errors');

const JOIN_GAME = 'JOIN_GAME';
const GUESS = 'GUESS';
const START_GAME = 'START_GAME';
const END_GAME = 'END_GAME';

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

          case END_GAME : {
            hook.data = { ended: true };

            return hook;
          }

          case GUESS : {
            hook.data = { '$push': { guesses: payload } };
            if (payload.guess === game.animal) {
              hook.data = {
                winner: payload.player,
                ended: true,
              };
            }

            return hook;
          }

          default :
            return Promise.resolve(hook);
        }
      });
  };
};
