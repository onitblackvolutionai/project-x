import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser {
  name: string
  email: string
  password: string
  createdAt: Date
  resetPasswordToken?: string
  resetPasswordExpire?: Date
}

export interface IUserMethods {
  matchPassword(enteredPassword: string): Promise<boolean>
}

const userSchema = new mongoose.Schema<IUser, {}, IUserMethods>({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
})

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// Match password method
userSchema.methods.matchPassword = async function(enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password)
}

export default mongoose.models.User || mongoose.model<IUser, mongoose.Model<IUser, {}, IUserMethods>>('User', userSchema) 