import { expect } from 'chai';
import { describe, it } from 'meteor/cultofcoders:mocha';
import { Meteor } from 'meteor/meteor';
import { validateNewUser } from './users';


if (Meteor.isServer) {
  describe('users', () => {
    it('should allow valid email address', () => {
      const testUser = {
        emails: [
          {
            address: 'simon@testing.com',
          },
        ],
      };
      expect(validateNewUser(testUser)).to.be.true;
    });

    it('should not allow invalid email address', () => {
      const testUser = {
        emails: [
          {
            address: 'simon',
          },
        ],
      };
      // const res = validateNewUser(testUser);
      expect(() => {
        validateNewUser(testUser).to.throw();
      });
    });
  });
}
