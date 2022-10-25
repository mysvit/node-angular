import { environment } from '@env'
import { ApiPath } from '@shared'
import chai from 'chai'
import chaiHttp from 'chai-http'
import chaiSpies from 'chai-spies'
import jwt from 'jsonwebtoken'
import { afterEach } from 'mocha'
import { app } from '../../../server'
import { pictureCore } from '../../ref/db-pools-core'

const {sign} = jwt
const expect = chai.expect
chai.use(chaiHttp)
chai.use(chaiSpies)

// test route path and called method
describe('PictureApi', () => {

    const agent = chai.request.agent(app())
    const token = sign({user_id: 'user_test_uuid'}, environment.token_key, {expiresIn: '60s'})

    afterEach(() => {
        chai.spy.restore(pictureCore)
    })

    it('POST ' + ApiPath.picture_add, async () => {
        const spy = chai.spy.on(pictureCore, 'add', () => 1)
        await agent
            .post(ApiPath.picture_add)
            .set({'user_id': 'user_test_uuid', 'authorization': 'Bearer ' + token})
            .type('form')
            .send({})
        expect(spy).to.have.been.called()
    })

})
