export namespace ApiPath {
    const api = '/api'
    const user = '/user'
    const picture = '/picture'

    export const user_signup = api + user + '/signup'
    export const user_login = api + user + '/login'
    export const user_auth = api + user + '/auth'
    export const user_verify = api + user + '/verify/:user_id'
    export const user_get_profile = api + user + '/get_profile/:user_id'

    export const picture_get = api + picture + '/get/:picture_id'
    export const picture_add = api + picture + '/add'
    export const picture_update = api + picture + '/update'
}
