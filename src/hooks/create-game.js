// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// const animals = ['panda', 'dog', 'cat'];
// let animal = animals[Math.floor(Math.random() * animals.length)];

const Game = require('../models/games.class');
const randomAnimal = require('./randomAnimal');

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function createGame (hook) {
    return randomAnimal(hook)
      .then((animal) => {
        const game = new Game();
        const { user } = hook.params;

        game.setup(user);
        hook.data = game;
        hook.data.animal = animal;

        return Promise.resolve(hook);
      });
  };
};
