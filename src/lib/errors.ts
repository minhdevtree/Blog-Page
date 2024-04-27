import { CredentialsSignin } from 'next-auth';

export class EmailNotVerifiedError extends CredentialsSignin {
    code = 'email_not_verified';
}

export class AccountNotExistsError extends CredentialsSignin {
    code = 'account_not_exists';
}

export class InvalidLoginError extends CredentialsSignin {
    code = 'invalid_login';
}

export class UnauthorizedError extends CredentialsSignin {
    code = 'unauthorized';
}

export class InvalidLoginTypeError extends CredentialsSignin {
    code = 'invalid_login_type';
}
