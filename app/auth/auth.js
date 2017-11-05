const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const userDB = require('../db');

const fetchUser = async (name, pass, idUser) => {
  const users = await userDB.get('users');
  const user = users.find(({ email, password , id}) => idUser && id === idUser || email === name && password === pass);

  return user;
};

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await fetchUser(null, null, id);
    done(null, user);
  } catch(err) {
    done(err);
  }
});

passport.use(new LocalStrategy(function(username, password, done) {
  fetchUser(username, password)
    .then(user => {
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
    .catch(err => done(err))
}));
