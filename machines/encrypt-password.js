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
    },
    'salt': {
      example: 'foo',
      friendlyName: 'Salt',
      description: 'Optional salt to use with the hash'
    }
  },
  defaultExit: 'then',
  exits: {
    'then': {
      example: 'abc3fadifhoi3hesdqd',
      description: 'String was successfully encrypted'
    },
    'error': {
      description: 'An unexpected error occured.'
    }
  },
  fn: function(inputs, exits) {

    var salt = salt ? (isNaN(parseInt(salt,10)) ? salt : parseInt(salt,10)) : 10;
    try {
      require('bcrypt').hash(inputs.string, salt, function(err, hash) {
        if (err) {
          return exits.error(err);
        } else {
          return exits.then(hash);
        }
      });
    } catch (e) {
      return exits.error(e);
    }

  }

};
