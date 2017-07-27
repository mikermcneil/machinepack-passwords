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
      description: 'The password to be irreversibly encrypted.',
      required: true,
    },

    strength: {
      example: 10,
      defaultsTo: 10,
      description: 'The hash strength.',
      extendedDescription: 'Strength is measured in this case by the number of iterations it takes to generate the cryptographic key.  Hashes generated with a higher "strength" value will take longer to crack with brute force, but will also take longer to generate.  A minimum of 10 (the default) is recommended.',
      moreInfoUrl: 'https://en.wikipedia.org/wiki/Bcrypt'
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Encrypted password (hash)',
      outputExample: '2$a492.abc3fadifhoi3hesdqd',
      outputDescription: 'The encrypted password hash generated from the provided password.'
    },

  },


  fn: function(inputs, exits) {

    // Import pure js `bcrypt` module.
    var bcrypt = require('bcryptjs');

    // Hash the plaintext password.
    bcrypt.hash(inputs.password, inputs.strength, function(err, hash) {

      // Forward any errors to our `error` exit.
      if (err) {
        return exits.error(err);
      }

      // Return the hashed password through the `success` exit.
      return exits.success(hash);

    });

  }

};
