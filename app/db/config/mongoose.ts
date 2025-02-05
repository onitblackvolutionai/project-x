// import mongoose from 'mongoose'

// declare global {
//   var mongoose: {
//     conn: typeof mongoose | null
//     promise: Promise<typeof mongoose> | null
//   }
// }

// if (!process.env.MONGODB_URI) {
//   throw new Error('Please add your MONGODB_URI to .env.local')
// }

// const MONGODB_URI: string = process.env.MONGODB_URI

// let cached = global.mongoose

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null }
// }

// export async function connectToDatabase() {
//   if (cached.conn) {
//     return cached.conn
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     }

//     cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
//       console.log('Connected to MongoDB successfully!')
//       return mongoose
//     }).catch((error) => {
//       console.error('Error connecting to MongoDB:', error)
//       throw error
//     })
//   }

//   try {
//     cached.conn = await cached.promise
//   } catch (e) {
//     cached.promise = null
//     throw e
//   }

//   return cached.conn
// }

// // Test the connection
// if (process.env.NODE_ENV !== 'production') {
//   connectToDatabase()
//     .then(() => console.log('MongoDB connection test successful'))
//     .catch((error) => console.error('MongoDB connection test failed:', error))
// } 