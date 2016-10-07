module.exports = {


  friendlyName: 'Check password attempt',


  description: 'Compare a plaintext password attempt against an already-encrypted Bcrypt hash.',


  extendedDescription: 'Useful for checking a password attempt against the stored, already-encrypted BCrypt hash, '+
  'e.g. stored in your database.',


  sideEffects: 'cacheable',


  inputs: {

    passwordAttempt: {
      example: 'l0lcatzz',
      description: 'The password attempt (unencrypted).',
      required: true,
    },

    encryptedPassword: {
      example: 'as34hafsu#w34ndcarok',
      description: 'The existing (already-encrypted) password hash to compare against.',
      whereToGet: {
        description: 'Look up the already-encrypted password hash stored for this user in your database.',
        extendedDescription: 'For example, when a user signs up, your route could use the "Encrypt password" machine '+
        'to perform one-way encryption on their password.  This uses the BCrypt algorithm, to generate a secure '+
        'password "hash" that you can then safely store in your database (i.e. when you create a new record for the '+
        'user in your User model.)',
      },
      required: true,
    }

  },


  exits: {

    success: {
      description: 'Password attempt matched the already-encrypted version.'
    },

    incorrect: {
      description: 'Password attempt did not match already-encrypted version.'
    }

  },


  fn: function(inputs, exits) {

    // Import native `bcrypt` module.
    var bcrypt = require('bcrypt-nodejs');

    // Run `compare` to compare the plaintext and encrypted passwords
    // in constant time.
    bcrypt.compare(inputs.passwordAttempt, inputs.encryptedPassword, function(err, ok) {

      // Forward any errors to our `error` exit.
      if (err) {
        return exits.error(err);
      }

      // If the passwords don't match, return through the `incorrect` exit.
      if (!ok) {
        return exits.incorrect();
      }

      // Otherwise return through the `success` exit.
      return exits.success();
    });
  }

};
