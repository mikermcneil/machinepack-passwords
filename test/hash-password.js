/**
 * Module dependencies
 */

var assert = require('chai').assert;
var Passwords = require('../');




describe('machinepack-passwords :: hash-password', function() {

  it ('should hash a password such that it matches when compared in `checkPassword`', function(done) {

    var password = 'what do you call a frog that that got turned inside out';
    Passwords.hashPassword({
      password: password
    }).switch({
      error: done,
      success: function(hashedPassword) {
        Passwords.checkPassword({
          passwordAttempt: password,
          hashedPassword: hashedPassword
        }).switch({
          success: done,
          incorrect: function() {return done(new Error('Triggered the `incorrect` exit!'));},
          error: done
        });
      }
    });

  });

  it ('should encrypt a string with custom iteration number into a password that will match the unencrypted version', function(done) {

    var password = 'what do you call a frog that that got turned inside out';
    Passwords.hashPassword({
      password: password,
      strength: 5
    }).switch({
      error: done,
      success: function(hashedPassword) {
        Passwords.checkPassword({
          passwordAttempt: password,
          hashedPassword: hashedPassword
        }).switch({
          success: done,
          incorrect: function() {return done(new Error('Triggered the `incorrect` exit!'));},
          error: done
        });
      }
    });

  });

  it ('should encrypt a string with default iteration number into a password that will have same iteration number information', function(done) {

    var password = 'what do you call a frog that that got turned inside out';
    Passwords.hashPassword({
      password: password,
      // strength: 10
    }).switch({
      error: done,
      success: function(hashedPassword) {
        assert.match(hashedPassword, /^\$2[a-zA-Z]\$10\$/, 'encryption cost matches');
        done();
      }
    });

  });

  it ('should encrypt a string with custom iteration number into a password that will have same iteration number information', function(done) {

    var password = 'what do you call a frog that that got turned inside out';
    Passwords.hashPassword({
      password: password,
      strength: 5
    }).switch({
      error: done,
      success: function(hashedPassword) {
        assert.match(hashedPassword, /^\$2[a-zA-Z]\$0?5\$/, 'encryption cost matches');
        done();
      }
    });

  });

});
