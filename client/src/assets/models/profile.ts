export interface Profile {
  id: string
  email: string
  firstName: string
  lastName: string
  middleName: string | null
  phone: string | null
  avatar: string | null
  address: string
  dateOfBirth: string | null
}

export interface DefaultProfile {
  id: string
  email: string
  firstName: string
  lastName: string
  middleName: string
  phone: string
  avatar: string
  address: string
  dateOfBirth: string
}
