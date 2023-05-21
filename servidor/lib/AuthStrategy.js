import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User.model.js';

export const strategyInit = (passport) => {
  passport.use(
    'local',
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
      },
      (username, password, done) => {
        User.query()
          .findOne({ username: username })
          .then((user) => {
            if (!user) {
              return done(null, false, { err: 'Usuario desconocido' });
            }
            user.verifyPassword(String(password), (err, passwordIsCorrect) => {
              if (err) {
                return done(err);
              }
              if (!passwordIsCorrect) {
                return done(null, false);
              }
              return done(null, user);
            });
          })
          .catch((err) => {
            done(err);
          });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.username);
  });

  passport.deserializeUser((username, done) => {
    User.query()
      .findById(username)
      .then((user) => {
        done(null, user);
      });
  });
};

export default strategyInit;
