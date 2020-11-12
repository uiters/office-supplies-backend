import passport from 'passport';
import passportLocal from 'passport-local';
import passportJwt from 'passport-jwt';

import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/user.model';
import { UserModel } from '../mongoose/user.mongoose';

const LocalStrategy = passportLocal.Strategy;

passport.serializeUser(function (user: IUser, done) {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    UserModel.findById(id, (err, user: IUser) => {
        done(err, user);
    });
});

passport.use(
    new LocalStrategy(function(username, password, done) {
      UserModel.findOne({ email: username }, (err, user: IUser) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(undefined, false, {
            message: `Username: ${username} not found`
          });
        }
        user.comparePassword(password, (err: Error, isMatch: boolean) => {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return done(undefined, user);
          }
          return done(undefined, false, { message: "Invalid email or password" });
        });
      });
    })
  );
  

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'JWT_SECRET',
};

passport.use(
    new JwtStrategy(jwtOptions, async function (payload, done) {
        try {
            const user = await UserModel.findById(payload._id);
            if (!user) {
                return done(null, false);
            }
            return done(null, user);
        } catch (error) {
            return done(error, false);
        }
    })
);

export const authLocal = passport.authenticate('local', { session: false });
export const authJwt = passport.authenticate('jwt', { session: false });

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(400).send('Have to login');
};
