import { expect } from 'chai'
import { UserSignupModel } from './user-signup-model'

describe('UserSignupModel', () => {

    it('user_id', () => {
        const result = new UserSignupModel(<UserSignupModel>{user_id: '1111-2222', username: 'name'})
        expect(result.user_id).to.equal('1111-2222')
    })

})
