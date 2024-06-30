type ParseLayoutResult = {
    name: string
    requiredArgs: Array<string>
    optionalArgs: Array<string>
    requiredFlags: Array<string>
    optionalFlags: Array<string>
}

export const parseLayout = (layout: string): ParseLayoutResult => {
    return {} as any
}

type ParseArgvResult = {
    name: string
    params: Record<string, string>
}

export const parseArgv = (arg: Array<string>): ParseArgvResult => {
    return {} as any
}
