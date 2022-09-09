export namespace ApiPath {
    const api = '/api'
    const user = '/user'
    const picture = '/picture'

    export const user_signup = api + user + '/signup'
    export const user_sign_in = api + user + '/sign-in'
    export const user_auth = api + user + '/auth'
    export const user_verify_code = api + user + '/verify-code/:user_id'
    export const user_resend_code = api + user + '/resend-code/:user_id'
    export const user_forgot_pass = api + user + '/forgot-pass'
    export const user_reset_pass = api + user + '/reset-pass'
    export const user_get_profile = api + user + '/get-profile/:user_id'
    export const user_upd_public_profile = api + user + '/upd-public-profile/:user_id'
    export const user_upd_profile_picture = api + user + '/upd-profile-picture/:user_id'

    export const picture_get = api + picture + '/get/:picture_id'
    export const picture_add = api + picture + '/add'
    export const picture_upd = api + picture + '/upd'
}
