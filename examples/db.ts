import { Cley } from '../src'

new Cley('db')
    .command('set <key> <value>', ({ key, value }) => {
        console.log(`${key} is set to ${value}`)
    })
    .command('get <key>', ({ key }) => {
        console.error(`storeage is not implemented`)
    })
    .run()
