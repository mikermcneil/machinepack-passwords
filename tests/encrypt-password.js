var Passwords = require('../');

describe('machinepack-passwords :: encrypt-password', function() {

  it ('should encrypt a string into a password that will match the unencrypted version when used in `checkPassword`', function(done) {

    var password = "what do you call a frog that that got turned inside out";
    Passwords.encryptPassword({
      password: password
    }).exec({
      error: done,
      success: function(encryptedPassword) {
        Passwords.checkPassword({
          passwordAttempt: password,
          encryptedPassword: encryptedPassword
        }).exec({
          success: done,
          incorrect: function() {return done(new Error('Triggered the `incorrect` exit!'));},
          error: done
        });
      }
    });

  });

});
