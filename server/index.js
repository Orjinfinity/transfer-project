const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 7272
const hostname = 'localhost'

const app = next({ dev, port, hostname })
const handle = app.getRequestHandler()

const init = async () => {
  try {
    await app.prepare()
    const server = express()

    server.all('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(process.env)
      console.log(`> Ready on ${hostname}:${port}`)
    })

  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

init()
