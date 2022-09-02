import { environment } from '@env'
import { expect } from 'chai'
import { Logger } from '../logger'
import { EmailSender } from './email-sender'

describe('EmailSender', () => {

    it('sendEmail', async () => {
        const emailSender = new EmailSender(environment, new Logger(environment))
        const sender = await emailSender.sendEmail('test@email.com', 'test', 'Hello word')
        expect(sender.envelope.to).to.deep.eq(['test@email.com'])
    })

})
