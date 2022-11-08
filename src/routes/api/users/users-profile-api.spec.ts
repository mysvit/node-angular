import chai from 'chai'
import chaiHttp from 'chai-http'
import chaiSpies from 'chai-spies'
import { afterEach } from 'mocha'
import { usersProfileCore } from '../../ref/db-pools-core'

chai.use(chaiHttp)
chai.use(chaiSpies)

// test route path and called method
describe('UserProfileApi', () => {

    afterEach(() => {
        chai.spy.restore(usersProfileCore)
    })

    // it('GET ' + ApiPath.user_get_profile_short, async () => {
    //     const spy = chai.spy.on(userCore, 'getProfileShort', () => true)
    //     const token = sign({user_id: 'user_test_uuid'}, environment.token_key, {expiresIn: '60s'})
    //     await agent
    //         .get(ApiPath.user_get_profile_short)
    //         .query({user_id: 'uuid'})
    //         .set({'user_id': 'user_test_uuid', 'authorization': 'Bearer ' + token})
    //     expect(spy).to.have.been.called()
    // })

})
