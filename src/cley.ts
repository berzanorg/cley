import type { Handler } from './types'
import { parseArgv, parseLayout } from './parse'

export class Cley {
    name: string
    commands: Map<string, Command>

    constructor(name: string) {
        this.name = name
        this.commands = new Map()
    }

    command<T extends string>(layout: T, handler: Handler<T>): Cley {
        const {
            name,
            requiredArgs,
            optionalArgs,
            requiredFlags,
            optionalFlags,
        } = parseLayout(layout)

        if (this.commands.has(name)) {
            throw Error(`Command ${name} cannot be defined many times`)
        }

        this.commands.set(name, {
            requiredArgs,
            optionalArgs,
            requiredFlags,
            optionalFlags,
            handler,
        })

        return this
    }

    async run(): Promise<void> {
        const { name, params } = parseArgv(process.argv)

        const command = this.commands.get(name)

        if (!command) {
            throw Error(`Command ${name} doesn't exist`)
        }

        const result = command.handler(params)

        if (result instanceof Promise) await result
    }
}

type Command = {
    requiredArgs: Array<string>
    optionalArgs: Array<string>
    requiredFlags: Array<string>
    optionalFlags: Array<string>
    handler: Handler<any>
}
