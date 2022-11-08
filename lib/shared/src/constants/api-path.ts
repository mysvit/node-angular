export namespace ApiPath {
    const api = '/api'
    const users = '/users'
    const pictures = '/pictures'
    const comments = '/comments'
    const comments_likes = '/comments-likes'

    export const users_signup = api + users + '/signup'
    export const users_sign_in = api + users + '/sign-in'
    export const users_auth = api + users + '/auth'
    export const users_verify_code = api + users + '/verify-code'
    export const users_resend_code = api + users + '/resend-code'
    export const users_forgot_pass = api + users + '/forgot-pass'
    export const users_reset_pass = api + users + '/reset-pass'
    export const users_get_profile = api + users + '/get-profile'
    export const users_upd_public_profile = api + users + '/upd-public-profile'
    export const users_upd_picture_profile = api + users + '/upd-picture-profile'
    export const users_modify_email = api + users + '/modify-email'
    export const users_verify_new_email = api + users + '/verify-new-email'
    export const users_change_password = api + users + '/change-password'

    export const pictures_add = api + pictures + '/add'
    export const pictures_upd = api + pictures + '/upd'
    export const pictures_get = api + pictures + '/get/:id'

    export const comments_add = api + comments + '/add'
    export const comments_upd = api + comments + '/upd'
    export const comments_del = api + comments + '/del/:id'
    export const comments_get = api + comments + '/get/:id'
    export const comments_list = api + comments + '/list'

    export const comments_likes_set = api + comments_likes + '/set'
    export const comments_likes_list = api + comments_likes + '/list'
}
