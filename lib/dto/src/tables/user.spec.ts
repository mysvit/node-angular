import { expect } from 'chai'
import { User } from './user'

describe('User', () => {

    it('user_id', () => {
        const result = new User(<User>{user_id: '1111-2222', user_name: 'name'})
        expect(result.user_id).to.equal('1111-2222')
    })

})
