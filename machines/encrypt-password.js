module.exports = {


  friendlyName: 'Encrypt password',


  description: 'Perform one-way encryption on a password using the BCrypt algorithm.',


  extendedDescription: 'The BCrypt algorithm is _one-way_-- in other words, passwords encrypted (aka "hashed") this way '+
  '_cannot be decrypted_.  This is ideal for encrypting user passwords before storing them in the database, for example '+
  'when a new user signs up for an account.  To _check_ a password attempt, for example when an existing user tries to '+
  'sign in, use **Check password attempt**.',
  
  
  moreInfoUrl: 'https://en.wikipedia.org/wiki/Bcrypt',


  sideEffects: 'cacheable',


  inputs: {

    password: {
      example: 'l0lcatzz',
      description: 'String to be encrypted.',
      required: true,
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Encrypted password',
      outputExample: '2$a492.abc3fadifhoi3hesdqd',
      outputDescription: 'The encrypted version of the input password.'
    },

  },


  fn: function(inputs, exits) {

    // Import native `bcrypt` module.
    var bcrypt = require('bcrypt-nodejs');

    // Hash the plaintext password.
    bcrypt.hash(inputs.password, null , null, function(err, hash) {

      // Forward any errors to our `error` exit.
      if (err) {
        return exits.error(err);
      }

      // Return the hashed password through the `success` exit.
      return exits.success(hash);
    });
  }

};
