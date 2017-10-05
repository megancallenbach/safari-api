const animals = ['cat', 'dog', 'panda'];

function randomAnimal(animals) {
  return animals[Math.floor(Math.random() * animals.length)];
}

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return function randomAnimal (hook) {
    // Hooks can either return nothing or a promise
    // that resolves with the `hook` object for asynchronous operations
    if (hook.method === 'find') {
      hook.result.data = hook.result.data.map((game) => (
        Object.assign(game, {
          animal: randomAnimal(animals)
        })
      ));
    } else {
      hook.result.animal = randomAnimal(animals);
    }

    return Promise.resolve(hook);
  };
};
