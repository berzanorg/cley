import { expectTypeOf, test } from 'vitest'
import type { Handler } from '../src/types'

test('Handler type', () => {
    expectTypeOf<Handler<'install'>>().toMatchTypeOf<
        (params: {}) => Promise<void> | void
    >()

    expectTypeOf<Handler<'install <name>'>>().toMatchTypeOf<
        (params: { name: string }) => Promise<void> | void
    >()

    expectTypeOf<Handler<'install <name?>'>>().toMatchTypeOf<
        (params: { name?: string }) => Promise<void> | void
    >()

    expectTypeOf<Handler<'install <name> -version'>>().toMatchTypeOf<
        (params: { name: string; version: string }) => Promise<void> | void
    >()

    expectTypeOf<Handler<'install <name> -version?'>>().toMatchTypeOf<
        (params: { name: string; version?: string }) => Promise<void> | void
    >()
})
