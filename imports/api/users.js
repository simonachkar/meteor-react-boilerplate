import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

const validateNewUser = (user) => {
  const email = user.emails[0].address;


  new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email,
    },
  }).validate({ email });


  return true;
};

Meteor.methods({
  'users.create': function (email, password, fields) {
    new SimpleSchema({
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
    }).validate({
      ...fields,
    });

    const userId = Accounts.createUser({ email, password });

    Accounts.validateNewUser(validateNewUser);

    Meteor.users.update(userId, {
      $set: {
        ...fields,
      },
    });

    return userId;
  },
});
