// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function createGame (hook) {
    hook.data = {
      title: `${hook.params.user.name}'s Game`,
      started: false,
      image: { imageSrc: 'https://static.pexels.com/photos/50577/hedgehog-animal-baby-cute-50577.jpeg', word: 'hedgehog'},
      guesses: [],
      players: [hook.params.user._id]
    };

    return Promise.resolve(hook);
  };
};
