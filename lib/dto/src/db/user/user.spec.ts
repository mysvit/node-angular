import { expect } from 'chai'
import { UserSignup } from './user-signup'

describe('User', () => {

    it('user_id', () => {
        const result = new UserSignup(<UserSignup>{user_id: '1111-2222', user_name: 'name'})
        expect(result.user_id).to.equal('1111-2222')
    })

})
