import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { BaseModelWithAttributes } from './base_attribute.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(AuthFinder, BaseModelWithAttributes(BaseModel)) {
  // @column({ isPrimary: true })
  // declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  // @column.dateTime({ autoCreate: true })
  // declare createdAt: DateTime

  // @column.dateTime({ autoCreate: true, autoUpdate: true })
  // declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)
}

type UserInstance = InstanceType<typeof User>
type BaseModelInstance = InstanceType<typeof BaseModel>

export type UserFields = Omit<UserInstance, keyof BaseModelInstance>
