export namespace EmailHelper {

    export async function send(to: string, subject: string, body: string) {
        console.debug('Send email', to, subject, body)
        return 1
    }

}
