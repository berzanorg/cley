import type { Command, Handler } from './types'
import { parseArgv, parseLayout } from './parse'

export class Cley {
    name: string
    commands: Map<string, Command>

    constructor(name: string) {
        this.name = name
        this.commands = new Map()
    }

    command<T extends string>(layout: T, handler: Handler<T>): Cley {
        const { name, parsedLayout } = parseLayout(layout)

        if (this.commands.has(name)) {
            throw Error(`Command ${name} cannot be defined many times`)
        }

        this.commands.set(name, {
            handler,
            parsedLayout,
        })

        return this
    }

    async run(): Promise<void> {
        const name = process.argv[2]

        if (!name) {
            throw Error(`Command name is not given`)
        }

        const command = this.commands.get(name)

        if (!command) {
            throw Error(`Command ${name} doesn't exist`)
        }

        const params = parseArgv(process.argv.slice(3), command.parsedLayout)

        const result = command.handler(params)

        if (result instanceof Promise) await result
    }
}
