module.exports = {
  friendlyName: 'Check password',
  description: 'Compare a plaintext password attempt against an already-encrypted version.',
  extendedDescription: 'Useful for checking a password attempt against the stored, already-encrypted BCrypt hash.',
  inputs: {
    'passwordAttempt': {
      example: 'l0lcatzz',
      friendlyName: 'Password attempt',
      description: 'The password attempt (unencrypted).',
      required: true
    },
    'encryptedPassword': {
      example: 'as34hafsu#w34ndcarok',
      friendlyName: 'Encrypted password',
      description: 'The existing (already-encrypted) password hash to compare against.',
      required: true
    }
  },
  defaultExit: 'match',
  exits: {
    'match': {
      void: true,
      description: 'Password attempt matches already-encrypted version'
    },
    'no_match': {
      void: true,
      description: 'Password attempt does not match already-encrypted version'
    },
    'error': {
      description: 'An unexpected error occurred'
    }
  },
  fn: function(inputs, exits) {
    require('bcrypt').compare(inputs.passwordAttempt, inputs.encryptedPassword, function(err, ok) {
      if (err) {
        return exits.error(err);
      } else if (!ok) {
        return exits.no_match();
      } else {
        return exits.match();
      }
    });
  }

};
