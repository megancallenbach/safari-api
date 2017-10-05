// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function createGame (hook) {
    const animals = ['panda', 'dog', 'cat'];
    let animal = animals[Math.floor(Math.random() * animals.length)];
    hook.data = {
      title: `${hook.params.user.name}'s Game`,
      started: false,
      time: 25,
      animal: animal,
      guesses: [],
      scores: [],

      players: [hook.params.user._id]
    };
    return Promise.resolve(hook);
  };
};
