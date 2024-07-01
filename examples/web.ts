import { Cley } from '../src'

new Cley('web')
    .command('get <url>', async ({ url }) => {
        const response = await fetch(url)

        console.log(await response.text())
    })
    .command('post <url> <body>', async ({ url, body }) => {
        const response = await fetch(url, {
            method: 'POST',
            body,
        })

        console.log(await response.text())
    })
    .run()
