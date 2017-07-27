module.exports = {


  friendlyName: 'Check password strength',


  description: 'Enforce a secure password',


  extendedDescription: 'Check if a given password has a minimum length, and a mix of lowercase and uppercase letters, numbers and special characters',


  cacheable: false,


  sync: true,


  inputs: {

    password: {
      example: 'l0lcatzz',
      friendlyName: 'Password',
      description: 'String to be encrypted',
      required: true,
      protect: true
    }

  },


  exits: {

    success: {
      description: 'The provided password has the minimum requirements.'
    },

    incorrect: {
      //the return object has the info about what's missing
      example: {
        minimumLength: true,
        upperCaseLetters: false,
        lowerCaseLetters: true,
        numbers: false,
        specialCharacters: true
      },
      description: 'The password does not match our minumum requirements.'
    },

    error: {
      description: 'An unexpected error occured.'
    }

  },


  fn: function (inputs, exits) {
    var matchAll = true, returnObject = {
      minimumLength: false,
      upperCaseLetters: false,
      lowerCaseLetters: false,
      numbers: false,
      specialCharacters: false
    };
    try {
      matchAll = (returnObject.minimumLength = (inputs.password.length >= 8)) && matchAll;
      matchAll = (returnObject.upperCaseLetters = (/(?=.*[A-Z])/.test(inputs.password))) && matchAll;
      matchAll = (returnObject.lowerCaseLetters = (/(?=.*[a-z])/.test(inputs.password))) && matchAll;
      matchAll = (returnObject.numbers = (/(?=.*\d)/.test(inputs.password))) && matchAll;
      matchAll = (returnObject.specialCharacters = (/[\W]/.test(inputs.password))) && matchAll;
    } catch (e) {
      return exits.error(e);
    }

    if (matchAll) {
      return exits.success();
    }
    return exits.incorrect(returnObject);
  },


};
