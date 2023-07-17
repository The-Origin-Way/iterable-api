/**
 * @see https://github.com/geoffdutton/iterable-api
 */
declare module 'node-iterable-api' {
  type IterableDataFields = Record<string, unknown>
  type IterableResponseCode =
    | 'Success'
    | 'BadApiKey'
    | 'BadAuthorizationHeader'
    | 'BadJsonBody'
    | 'BadParams'
    | 'DatabaseError'
    | 'EmailAlreadyExists'
    | 'ExternalKeyConflict'
    | 'Forbidden'
    | 'ForbiddenParamsError'
    | 'ForgottenUserError'
    | 'GenericError'
    | 'InvalidEmailAddressError'
    | 'InvalidJwtPayload'
    | 'InvalidUserIdError'
    | 'JwtUserIdentifiersMismatched'
    | 'NotFound'
    | 'QueueEmailError'
    | 'RateLimitExceeded'
    | 'RequestFieldsTypesMismatched'
    | 'Unauthorized'
    | 'UniqueFieldsLimitExceeded'
    | 'UnknownEmailError'
    | 'UnknownUserIdError'
    | 'UserIdAlreadyExists'

  type IterableResponse = { msg: string; code: IterableResponseCode }
  type IterableResponseP = Promise<IterableResponse>

  function create(apiKey: string): {
    printResources: () => void

    events: {
      track: (data: {
        email: string
        eventName: string
        createdAt: number
        dataFields: IterableDataFields
      }) => Promise<{
        msg: string
        code: IterableResponseCode
        params: { id: string }
      }>
    }

    users: {
      getByEmail: (data: { email: string }) => Promise<
        | {
            user: {
              email: string
              userId: string
              dataFields: IterableDataFields
            }
          }
        | Record<string, never> // {}
      >

      update: (body: {
        email: string
        dataFields: IterableDataFields
        preferUserId: boolean
        mergeNestedObjects: boolean
      }) => IterableResponseP

      updateEmail: ({
        currentEmail: string,
        newEmail: string,
      }) => Promise<unknown>
    }
  }
}
