import { expect, test } from 'vitest'
import { parseArgv, parseLayout } from '../src/parse'

test('parseArgv', () => {
    expect(
        parseArgv(['Berzan'], {
            requiredArgs: ['name'],
            optionalArgs: [],
            requiredFlags: [],
            optionalFlags: [],
        })
    ).toStrictEqual({
        name: 'Berzan',
    })

    expect(
        parseArgv(['cley', '-version=1.0.0'], {
            requiredArgs: ['name'],
            optionalArgs: [],
            requiredFlags: ['version'],
            optionalFlags: [],
        })
    ).toStrictEqual({
        name: 'cley',
        version: '1.0.0',
    })
})

test('parseLayout', () => {
    expect(parseLayout('build')).toStrictEqual({
        name: 'build',
        parsedLayout: {
            requiredArgs: [],
            optionalArgs: [],
            requiredFlags: [],
            optionalFlags: [],
        },
    })

    expect(parseLayout('get <url>')).toStrictEqual({
        name: 'get',
        parsedLayout: {
            requiredArgs: ['url'],
            optionalArgs: [],
            requiredFlags: [],
            optionalFlags: [],
        },
    })

    expect(parseLayout('build -release?')).toStrictEqual({
        name: 'build',
        parsedLayout: {
            requiredArgs: [],
            optionalArgs: [],
            requiredFlags: [],
            optionalFlags: ['release'],
        },
    })

    expect(parseLayout('set <key> <value>')).toStrictEqual({
        name: 'set',
        parsedLayout: {
            requiredArgs: ['key', 'value'],
            optionalArgs: [],
            requiredFlags: [],
            optionalFlags: [],
        },
    })

    expect(parseLayout('install <name> -version -registry?')).toStrictEqual({
        name: 'install',
        parsedLayout: {
            requiredArgs: ['name'],
            optionalArgs: [],
            requiredFlags: ['version'],
            optionalFlags: ['registry'],
        },
    })
})
