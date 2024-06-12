import { BaseCommand, args, flags } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { readFile, writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'

export default class MakeCollection extends BaseCommand {
  static commandName = 'make:collection'
  static description = 'Create a new model, controller, service, and route.'

  static options: CommandOptions = {}

  @args.string({
    required: true,
    argumentName: 'collection name',
  })
  declare name: string

  async prepare() {
    console.log('preparing')
  }

  async interact() {
    console.log('interacting')
  }

  async run() {
    console.log('running')
    const nameCapitalized = this.name.charAt(0).toLowerCase() + this.name.slice(1)
    const modelPath = join(
      fileURLToPath(import.meta.url),
      '..',
      'app',
      'models',
      `${nameCapitalized}.ts`
    )
    console.log('modelPath', modelPath)
    const controllerPath = join(
      fileURLToPath(import.meta.url),
      '..',
      'app',
      'controllers',
      `${nameCapitalized}_controller.ts`
    )
    console.log('controllerPath', controllerPath)
    const servicePath = join(
      fileURLToPath(import.meta.url),
      '..',
      'app',
      'services',
      `${nameCapitalized}_service.ts`
    )
    console.log('servicePath', servicePath)

    const routePath = join(fileURLToPath(import.meta.url), '..', 'start', 'routes.ts')
    console.log('routePath', routePath)

    // Create model
    mkdirSync(modelPath, { recursive: true })
    writeFileSync(modelPath, `export default class ${nameCapitalized} {}`)

    // Create controller
    mkdirSync(controllerPath, { recursive: true })
    writeFileSync(controllerPath, `export default class ${nameCapitalized}Controller {}`)

    // Create service
    mkdirSync(servicePath, { recursive: true })
    writeFileSync(servicePath, `export default class ${nameCapitalized}Service {}`)

    // Add route
    const routeContent = readFile(routePath, {
      encoding: 'utf-8',
    })
    const newRoute = `router.resource('${this.name.toLowerCase()}', '${nameCapitalized}Controller')`
    const updatedRouteContent = routeContent.replace(/(router\.boot\(\))/, `${newRoute}\n$1`)
    writeFileSync(routePath, updatedRouteContent)

    this.logger.info(`Collection ${this.name} created`)
  }

  async completed() {
    console.log('completed')
  }
}
