import { EmailConnection, Environment } from '@env'
import * as nodemailer from 'nodemailer'
import { Logger } from '../logger'

export class EmailSender {

    constructor(private env: Environment, private logger: Logger) {
    }

    public async sendEmail(
        to: string,
        subject: string,
        text: string,
        html?: string
    ): Promise<number> {
        let emailConnection: EmailConnection = this.env.email
        if (!this.env.production) {
            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing
            let testAccount = await nodemailer.createTestAccount()
            emailConnection = <EmailConnection>{
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: testAccount.user, // generated ethereal user
                    pass: testAccount.pass // generated ethereal password
                }
            }
        }

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport(emailConnection)
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: emailConnection.auth.user, // sender address
            to: to, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
            html: html // html body
        })

        this.logger.info('Message sent:', info)
        if (!this.env.production) {
            this.logger.info('Message sent: %s', info.messageId)
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview only available when sending through an Ethereal account
            this.logger.info('Preview URL: %s', nodemailer.getTestMessageUrl(info))
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        }
        return 1
    }

}