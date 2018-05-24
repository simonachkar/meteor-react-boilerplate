import {Meteor} from 'meteor/meteor';
import {validateNewUser} from './users';
import {expect} from 'chai';

if (Meteor.isServer) {
    describe('users', function () {

        it('should allow valid email address', function() {
            const testUser = {
                emails: [
                    {
                        address: 'simon@testing.com'
                    }
                ]
            };
            expect(validateNewUser(testUser)).to.be.true;
        });

        it('should not allow invalid email address', function() {
            const testUser = {
                emails: [
                    {
                        address: 'simon'
                    }
                ]
            };
            //const res = validateNewUser(testUser);
            expect(() => {validateNewUser(testUser)}).to.throw();
        });

    });
}