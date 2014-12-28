module.exports = {
  friendlyName: 'Encrypt password',
  description: 'Encrypt a string using the BCrypt algorithm.',
  extendedDescription: 'This is particularly useful for encrypting user passwords before storing them in the database.',
  inputs: {
    'password': {
      example: 'l0lcatzz',
      friendlyName: 'Password',
      description: 'String to be encrypted',
      required: true
    }
  },
  defaultExit: 'success',
  exits: {
    'success': {
      example: '2$a492.abc3fadifhoi3hesdqd',
      description: 'Password was successfully encrypted.'
    },
    'error': {
      description: 'An unexpected error occured.'
    }
  },
  fn: function(inputs, exits) {

    // `difficulty` indicates how "hard" the encrypted password hash will be to crack.
    // see https://www.npmjs.com/package/bcrypt for more information.
    var difficulty = 10;

    require('bcrypt').hash(inputs.password, difficulty, function(err, hash) {
      if (err) {
        return exits.error(err);
      }
      return exits.success(hash);
    });

  }

};
