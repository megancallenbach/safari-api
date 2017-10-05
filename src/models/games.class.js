class GameClass {
  setup(user) {
    this.title = `${user.name}'s Game`,
    this.started = false,
    this.animals = ['cat', 'dog', 'panda'],
    this.guesses = [],
    this.players = [user._id];
  }

  randomAnimal() {
    let animals = ['cat', 'panda', 'dog'];
    return animals[Math.floor(Math.random()* animals.length)];
  }


  checkGuess(user, guess) {
    return (guess === this.image.word)? true : false;
  }

  isNotJoinableBy(user) {
    return !this.isJoinableBy(user);
  }

  isJoinableBy(user) {
    return this.isJoinable() && !this.hasJoined(user);
  }

  hasJoined(user) {
    this.players.includes(user._id);
  }

  isJoinable() {
    return !this.isFull() && !this.isStarted();
  }

  isFull() {
    return this.players.length > 2;
  }

  isStarted() {
    return this.started;
  }
}

module.exports = GameClass;
