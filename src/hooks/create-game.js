// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function createGame (hook) {
    hook.data = {
      title: `${hook.params.user.name}'s Game`,
      started: false,
      time: 25,
      animals: ['cat', 'dog', 'panda'],
      guesses: [],
      players: [hook.params.user._id]
    };
    return Promise.resolve(hook);
  };
};
