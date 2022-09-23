import { Environment } from '@env'
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
        // if ethereal doesn't work
        this.logger.debug(`email to: [${to}] subject [${subject}] body: [${text}]`)

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport(this.env.email)
        // send mail with defined transport object
        const info = await transporter
            .sendMail({
                from: this.env.email.auth.user, // sender address
                to: to, // list of receivers
                subject: subject, // Subject line
                text: text, // plain text body
                html: html // html body
            })
            .catch((error) => {
                this.logger.error('EmailSender.sendEmail send: ', error)
            })

        if (info) {
            this.logger.info('EmailSender.sendEmail info: ', info)
            if (!this.env.production) {
                // Preview only available when sending through an Ethereal account
                this.logger.info('Preview URL: %s', nodemailer.getTestMessageUrl(info))
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            }
        }
        return info ? 1 : 0
    }

}
