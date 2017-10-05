// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function fixPlayerArray (hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    if (hook.method === 'find') {
     hook.result.data = hook.result.data.map((game) => (
       Object.assign(game, {
         players: game.players instanceof Array ? game.players : [game.players]
       })
     ));
    } else {
      hook.result = Object.assign(hook.result, {
        players: hook.result.players instanceof Array ? hook.result.players : [hook.result.players]
      });
    }
    return Promise.resolve(hook);
  };
};
