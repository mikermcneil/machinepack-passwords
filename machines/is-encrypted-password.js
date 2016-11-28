module.exports = {


  friendlyName: 'Test if a string is encrypted',


  description: 'Check if a string is a Bcrypt hash (an already encrypted password).',


  extendedDescription: 'Useful for testing wether a string (i.e a password) is already encrypted with a Bcrypt algorith.',


  sideEffects: 'cacheable',


  inputs: {

    potentialCrypt: {
      example: '2$a492.abc3fadifhoi3hesdqd',
      description: 'The potentially encrypted password.',
      required: true,
    }

  },


  exits: {

    success: {
      description: 'Wether or not string is encrypted.',
      example: true
    }

  },


  fn: function(inputs, exits) {

    // Import pure js `bcrypt` module.
    var bcryptHelper = require('bcrypt-helper');

    return exits.success(bcryptHelper.isHash(inputs.potentialCrypt));
  }

};
