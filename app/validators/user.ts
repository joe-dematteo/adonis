import vine from '@vinejs/vine'
import User, { UserFields } from '#models/user'

/**
 * Validates user fields
 */
export const userValidator = vine.compile(
  vine.object<UserFields>({
    firstName: vine.string().trim().minLength(6).maxLength(255),
    lastName: vine.string().trim(),
    email: vine.string().email().trim(),
  })
)
