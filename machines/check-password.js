module.exports = {


  friendlyName: 'Check password',


  description: 'Compare a plaintext password attempt against an already-encrypted version.',


  extendedDescription: 'Useful for checking a password attempt against the stored, already-encrypted BCrypt hash.',


  inputs: {
    passwordAttempt: {
      example: 'l0lcatzz',
      description: 'The password attempt (unencrypted).',
      required: true,
    },
    encryptedPassword: {
      example: 'as34hafsu#w34ndcarok',
      description: 'The existing (already-encrypted) password hash to compare against.',
      required: true,
    }
  },


  exits: {
    success: {
      description: 'Password attempt matched already-encrypted version.'
    },
    incorrect: {
      description: 'Password attempt did not match already-encrypted version.'
    }
  },


  fn: function(inputs, exits) {
    require('bcrypt-nodejs').compare(inputs.passwordAttempt, inputs.encryptedPassword, function(err, ok) {
      if (err) {
        return exits.error(err);
      }
      if (!ok) {
        return exits.incorrect();
      }

      return exits.success();
    });
  }

};
