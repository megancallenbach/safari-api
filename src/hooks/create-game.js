// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html


module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function createGame (hook) {

    function randomAnimal(){
      var animals = ['dog', 'cat', 'panda'];
      var randomAnimal = animals[Math.floor(Math.random()*animals.length)];
      return randomAnimal;
    }

    hook.data = {
      title: `${hook.params.user.name}'s Game`,
      started: false,
      time: 25,
      gameWon: false,
      animal: randomAnimal(),
      guesses: [],
      playerIds: [],
      readyPlayers: []
    };
    return Promise.resolve(hook);
  };
};
