import vine from '@vinejs/vine'
import User from '#models/user'

type UserFields = Partial<User>

/**
 * Validates the post's creation action
 */
export const createUserValidator = vine.compile(
  vine.object<UserFields>({
    firstName: vine.string().trim().minLength(6).nullable(),
    lastName: vine.string().trim().nullable(),
    email: vine.string().trim().escape().nullable(),
  })
)

/**
 * Validates the post's update action
 */
export const updateUserValidator = vine.compile(
  vine.object<UserFields>({
    firstName: vine.string().trim().minLength(6),
    lastName: vine.string().trim().escape(),
    email: vine.string().trim().escape(),
  })
)
