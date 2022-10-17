export namespace ApiPath {
    const api = '/api'
    const user = '/user'
    const picture = '/picture'
    const comment = '/comment'

    export const user_signup = api + user + '/signup'
    export const user_sign_in = api + user + '/sign-in'
    export const user_auth = api + user + '/auth'
    export const user_verify_code = api + user + '/verify-code'
    export const user_resend_code = api + user + '/resend-code'
    export const user_forgot_pass = api + user + '/forgot-pass'
    export const user_reset_pass = api + user + '/reset-pass'
    export const user_get_profile = api + user + '/get-profile'
    export const user_upd_public_profile = api + user + '/upd-public-profile'
    export const user_upd_picture_profile = api + user + '/upd-picture-profile'
    export const user_modify_email = api + user + '/modify-email'
    export const user_verify_new_email = api + user + '/verify-new-email'
    export const user_change_password = api + user + '/change-password'

    export const picture_add = api + picture + '/add'
    export const picture_upd = api + picture + '/upd'
    export const picture_get = api + picture + '/get/:id'

    export const comment_add = api + comment + '/add'
    export const comment_upd = api + comment + '/upd'
    export const comment_get = api + comment + '/get/:id'
    export const comment_list = api + comment + '/list'
}
