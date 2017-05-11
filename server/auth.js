const passport = require('passport');
const app = require('./index.js');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../db/models/User.js');
const config = require('./env/config.js');

const facebookStrategy = (callbackURL) => {
  return new FacebookStrategy({
    clientID: process.env.FacebookClientID || config.FACEBOOK.ID,
    clientSecret: process.env.FacebookClientSecret || config.FACEBOOK.SECRET,
    callbackURL: callbackURL,
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, cb) {
    cb(null, profile.id);
  });
};

const googleStrategy = (callbackURL) => {
  return new GoogleStrategy({
    clientID: process.env.GoogleClientID || config.GOOGLE.ID,
    clientSecret: process.env.GoogleClientSecret || config.GOOGLE.SECRET,
    callbackURL: callbackURL,
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    done(null, profile.id);
  });
};

const githubStrategy = (callbackURL) => {
  return new GithubStrategy({
    clientID: process.env.GitHubClientID || config.GITHUB.ID,
    clientSecret: process.env.GitHubClientSecret || config.GITHUB.SECRET,
    callbackURL: callbackURL,
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    done(null, profile.id);
  });
};

const localStrategy = () => {
  return new LocalStrategy((username, password, cb) => {
    UserModel.comparePasswords(username, password, cb);
  })
}

module.exports.facebookStrategy = facebookStrategy;
module.exports.googleStrategy = googleStrategy;
module.exports.githubStrategy = githubStrategy;
module.exports.localStrategy = localStrategy;