import { expect } from 'chai'
import { UserTbl } from './user-tbl'

describe('UserTbl', () => {

    it('user_id', () => {
        const result = new UserTbl(<UserTbl>{user_id: '1111-2222', nickname: 'name'})
        expect(result.user_id).to.equal('1111-2222')
    })

})
