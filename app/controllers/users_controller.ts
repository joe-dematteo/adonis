import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsersController {
  async register({}: HttpContext) {}

  async login({}: HttpContext) {}

  async logout({}: HttpContext) {}

  async me({}: HttpContext) {}

  // CRUDS
  async delete({ request }: HttpContext) {
    const id = request.param('id')
    const user = await User.findOrFail(id)
    await user.delete()

    return request.params
  }

  async update({ request, params }: HttpContext) {
    const id = params.id
    const data = request.only(['username', 'email', 'password'])
    const user = await User.findOrFail(id)
    user.merge(data)
    await user.save()

    return user
  }

  async findMany({params}: HttpContext) {
    const users = await User.all()

    return users
  }

  async findOne({ params }: HttpContext) {
    const id = params.id
    const user = await User.findOrFail(id)

    return user
  }
}
