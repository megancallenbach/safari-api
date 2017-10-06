// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const ADD_WIN = 'ADD_WIN';

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function addWin (hook) {
    return hook.app.service('users').get(hook.id)
      .then((user) => {

        const { type } = hook.data;

        switch(type) {

          case ADD_WIN : {

            var updateWonGames = (user.gamesWon + 1);
            
            hook.data = {
              gamesWon: updateWonGames
            };

            return hook;
          }

          default :

            return hook;

          }
      });
  };
};
