export class ErrorsMsg {
    static IdHasInvalidUuid: string = 'ID has invalid uuid format [{0}]'
    static EmailRegistered: string = 'User with this email already registered'
    static EmailRegisteredAndNotConfirmed: string = 'User with this email not confirmed, check email'
    static UserRegistered: string = 'User with this name already registered'
    static AllFieldsRequired: string = 'All fields required'
    static RouteNotFound: string = 'Route [{0}] not found'
    static IncorrectEmailOrPassword = 'Incorrect email or password.'
    static TokenRequired = 'A token is required for authentication.'
    static InvalidToken = 'Invalid Token'
    static CentralizedError = 'Centralized error handling:'
    static VerificationCodeWrongFormat = 'Verification code has wrong format'
    static VerificationCodeWrong = 'Verification code is wrong'
}
