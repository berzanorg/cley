import { ParsedLayout } from './types'

type ParseLayoutResult = {
    name: string
    parsedLayout: ParsedLayout
}

export const parseLayout = (layout: string): ParseLayoutResult => {
    let isNameFound = false
    const requiredArgs: Array<string> = []
    const optionalArgs: Array<string> = []
    const requiredFlags: Array<string> = []
    const optionalFlags: Array<string> = []
    let name = ''
    let startIndex = 0
    let type: 'unknown' | 'arg' | 'flag' = 'unknown'
    let isOptional = false

    for (let i = 0, c = layout[i]; i < layout.length; c = layout[++i]) {
        switch (c) {
            case ' ': {
                if (!isNameFound) {
                    name = layout.slice(0, i)
                    isNameFound = true
                    break
                }

                if (startIndex !== 0) {
                    if (isOptional) {
                        optionalFlags.push(layout.slice(startIndex, i - 1))
                        isOptional = false
                    } else {
                        console.log('heyy')
                        requiredFlags.push(layout.slice(startIndex, i))
                    }

                    startIndex = 0
                }

                break
            }

            case '<': {
                type = 'arg'
                break
            }

            case '-': {
                type = 'flag'
                break
            }

            case '?': {
                isOptional = true
                break
            }

            case '>': {
                if (isOptional) {
                    optionalArgs.push(layout.slice(startIndex, i - 1))
                    isOptional = false
                } else {
                    requiredArgs.push(layout.slice(startIndex, i))
                }

                startIndex = 0
                break
            }

            default: {
                if (type !== 'unknown' && startIndex === 0) {
                    startIndex = i
                }
                break
            }
        }
    }

    if (name === '') {
        name = layout
    }

    if (startIndex !== 0) {
        if (isOptional) {
            optionalFlags.push(layout.slice(startIndex, layout.length - 1))
        } else {
            requiredFlags.push(layout.slice(startIndex))
        }
    }

    return {
        name,
        parsedLayout: {
            requiredArgs,
            optionalArgs,
            requiredFlags,
            optionalFlags,
        },
    }
}

export const parseArgv = (
    argv: Array<string>,
    layout: ParsedLayout
): Record<string, string> => {
    const result: Record<string, string> = {}

    let i = 0

    for (const requiredArg of layout.requiredArgs) {
        if (!argv[i] || argv[i].startsWith('-')) {
            throw Error(`Required argument ${requiredArg} is not given`)
        }

        result[requiredArg] = argv[i]
        i++
    }

    for (const optionalArg of layout.optionalArgs) {
        if (!argv[i] || argv[i].startsWith('-')) {
            break
        }
        result[optionalArg] = argv[i]
        i++
    }

    for (const requiredFlag of layout.requiredFlags) {
        if (!argv[i]) {
            throw Error(`Required flag ${requiredFlag} is not given`)
        }

        if (!argv[i].startsWith('-')) {
            throw Error(`Expected -${requiredFlag} flag`)
        }

        const [, value] = argv[i].split('=')

        result[requiredFlag] = value
        i++
    }

    for (const optionalFlag of layout.optionalFlags) {
        if (!argv[i]) {
            break
        }
        if (!argv[i].startsWith('-')) {
            throw Error(`Expected -${optionalFlag} flag`)
        }

        const [, value] = argv[i].split('=')

        result[optionalFlag] = value
        i++
    }

    return result
}
