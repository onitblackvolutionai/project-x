export interface AuthFormData {
  name?: string
  email: string
  password?: string
  confirmPassword?: string
}

export interface User {
  id: string
  name: string
  email: string
  createdAt: Date
} 