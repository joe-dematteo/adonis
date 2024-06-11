import vine from '@vinejs/vine'
import type User from '#models/user'

/**
 * Validates the post's creation action
 */
export const createUserValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(6),
    slug: vine.string().trim(),
    description: vine.string().trim().escape(),
  })
)

/**
 * Validates the post's update action
 */
export const updateUserValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(6),
    description: vine.string().trim().escape(),
  })
)
