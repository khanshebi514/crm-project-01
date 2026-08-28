export class AuthError extends Error {
  constructor(message, code = "AUTH_ERROR", status = 401) {
    super(message);

    this.name = "AuthError";
    this.code = code;
    this.status = status;
  }
}

export class InvalidCredentialsError extends AuthError {
  constructor(message = "Invalid email or password.") {
    super(message, "INVALID_CREDENTIALS", 401);

    this.name = "InvalidCredentialsError";
  }
}

export class UserAlreadyExistsError extends AuthError {
  constructor(message = "An account with this email already exists.") {
    super(message, "USER_ALREADY_EXISTS", 409);

    this.name = "UserAlreadyExistsError";
  }
}

export class UserInactiveError extends AuthError {
  constructor(message = "This user account is inactive.") {
    super(message, "USER_INACTIVE", 403);

    this.name = "UserInactiveError";
  }
}

export class SessionExpiredError extends AuthError {
  constructor(message = "Your session has expired.") {
    super(message, "SESSION_EXPIRED", 401);

    this.name = "SessionExpiredError";
  }
}

export class SessionInvalidError extends AuthError {
  constructor(message = "Invalid session.") {
    super(message, "SESSION_INVALID", 401);

    this.name = "SessionInvalidError";
  }
}

export class AuthenticationRequiredError extends AuthError {
  constructor(message = "Authentication is required.") {
    super(message, "AUTHENTICATION_REQUIRED", 401);

    this.name = "AuthenticationRequiredError";
  }
}

export function isAuthError(error) {
  return error instanceof AuthError;
}
