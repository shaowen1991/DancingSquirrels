const UserModel = require('../../db/models/User.js');
const sessionHelpers = require('./sessionHelpers.js');

const insertExternal = (profile) => {
  let username = profile.id;
  let password = profile.id;
  UserModel.fetchOneExternal(username, password, (err, bool) => {
    if (!bool) {
      UserModel.insertOneExternal(username, password, profile.provider, profile.id, (err, user) => {
        if (err) {
          console.log('error');
        } else {
          console.log('success');
        }
      })
    }
  })
}

const sessionHandler = (req) => {
  req.session.regenerate((err) => {
    if (err) {
      console.log(err);
    }
  })
}

module.exports.insertExternal = insertExternal;
module.exports.sessionHandler = sessionHandler;

