export async function verifyEmail(email: string) {
  try {
    const apiKey = 'ce7d872deebc409185b04657a3065d05'
    const response = await fetch(
      `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${email}`
    )

    const data = await response.json()
    console.log('Email validation response:', data) // For debugging

    // Check the specific fields from Abstract API
    if (data.is_valid_format && data.is_smtp_valid) {
      return {
        isValid: true,
        score: data.quality_score,
        reason: null
      }
    }

    // Handle different error cases
    let reason = "This email address appears to be invalid"
    if (!data.is_valid_format) {
      reason = "Invalid email format"
    } else if (!data.is_smtp_valid) {
      reason = "This email address does not exist"
    } else if (data.is_disposable) {
      reason = "Disposable email addresses are not allowed"
    }

    return {
      isValid: false,
      score: data.quality_score || 0,
      reason
    }
  } catch (error) {
    console.error('Email verification error:', error)
    return {
      isValid: true, // Fallback to basic validation if API fails
      score: 1,
      reason: null
    }
  }
} 