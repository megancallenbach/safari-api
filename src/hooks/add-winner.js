module.exports = function(hook) {
  return hook.app.service('users').find(hook.user._id)
    .then((user) => {
      return hook.app.service('users').patch(user, { wonGames: user.wonGames++ });
    });
};
