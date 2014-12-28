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
      example: 23952359,
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

    var salt = inputs.salt ? (isNaN(parseInt(inputs.salt,10)) ? salt : parseInt(inputs.salt,10)) : 10;
    require('bcrypt').hash(inputs.password, salt, function(err, hash) {
      if (err) {
        return exits.error(err);
      } else {
        return exits.then(hash);
      }
    });
    return exits.error(e);

  }

};
