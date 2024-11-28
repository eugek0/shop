export interface AuthorizationForm {
  email: string
  password: string
}

export interface RegistrationForm extends AuthorizationForm {
  firstName: string
  lastName: string
  genderId: string
}

export interface Confirmation {
  email: string
  code: string
}
