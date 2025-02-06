import { supabase } from '@/app/db/config/supabase'
import { verifyEmail } from '@/app/lib/email-verification'
import bcrypt from 'bcryptjs'

export class AuthService {
  static async createUser(userData: { name: string; email: string; password: string }) {
    try {
      // Check if user exists
      const { data: existingUser } = await supabase
        .from('users')
        .select('email')
        .eq('email', userData.email)
        .single()

      if (existingUser) {
        throw new Error('User already exists with this email')
      }

      // Validate email format
      const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/
      if (!emailRegex.test(userData.email)) {
        throw new Error('Please enter a valid Gmail address')
      }

      // Verify email
      const verification = await verifyEmail(userData.email)
      if (!verification.isValid) {
        throw new Error(verification.reason || 'This email address appears to be invalid')
      }

      // Hash password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(userData.password, salt)

      // Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: { name: userData.name },
          emailRedirectTo: undefined,
        }
      })

      if (authError) throw authError

      // Create user in users table
      const { data: user, error: userError } = await supabase
        .from('users')
        .insert([
          {
            id: authData.user?.id,
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
            created_at: new Date().toISOString(),
          }
        ])
        .select('id, name, email, created_at')
        .single()

      if (userError) {
        console.error('Error creating user record:', userError)
        if (authData.user) {
          await supabase.auth.admin.deleteUser(authData.user.id)
        }
        throw new Error('Failed to create user account')
      }

      // Sign in immediately after signup
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: userData.email,
        password: userData.password,
      })

      if (signInError) throw signInError

      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.created_at,
        },
        session: signInData.session,
      }
    } catch (error) {
      console.error('Error in createUser:', error)
      throw error
    }
  }

  static async validateUser(email: string, password: string) {
    try {
      // First check if user exists in our database
      const { data: existingUser } = await supabase
        .from('users')
        .select('email')
        .eq('email', email)
        .single()

      if (!existingUser) {
        throw new Error('This email is not registered. Please sign up first.')
      }

      // Attempt to sign in
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        if (authError.message.includes('Invalid login credentials')) {
          throw new Error('Incorrect password')
        }
        throw authError
      }

      // Get user details
      const { data: user, error: userDetailsError } = await supabase
        .from('users')
        .select('id, name, email, created_at')
        .eq('email', email)
        .single()

      if (userDetailsError) {
        throw new Error('Failed to get user details')
      }

      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.created_at,
        },
        session: authData.session,
      }
    } catch (error) {
      console.error('Error in validateUser:', error)
      throw error
    }
  }

  static async generateResetToken(email: string) {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email)
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error in generateResetToken:', error)
      throw error
    }
  }
} 