import { environment } from '@env'
import chai from 'chai'
import chaiHttp from 'chai-http'
import chaiSpies from 'chai-spies'
import jwt from 'jsonwebtoken'
import { app } from '../../../server'
import { commentsCore } from '../../ref/db-pools-core'

const {sign} = jwt
const expect = chai.expect
chai.use(chaiHttp)
chai.use(chaiSpies)

// test route path and called method
describe('CommentsLikesApi', () => {

    const agent = chai.request.agent(app())
    const token = sign({user_id: 'user_test_uuid'}, environment.token_key, {expiresIn: '60s'})

    afterEach(() => {
        chai.spy.restore(commentsCore)
    })

    // it('POST ' + ApiPath.comment_add, async () => {
    //     const spy = chai.spy.on(commentsCore, 'add', () => 1)
    //     await agent
    //         .post(ApiPath.comment_add)
    //         .set({'user_id': 'user_test_uuid', 'authorization': 'Bearer ' + token})
    //         .type('form')
    //         .send({})
    //     expect(spy).to.have.been.called()
    // })

})
