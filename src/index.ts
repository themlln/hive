import * as morgan from 'morgan'
import * as path from 'path'
import * as express from 'express'
import { Request, Response, NextFunction } from 'express'
import * as compression from 'compression'

import { createConnection, Connection, getRepository, Repository } from 'typeorm'
import 'reflect-metadata'
import { TypeormStore } from 'connect-typeorm'
import { User } from './entity/User'
import { Session } from './entity/Session'


import * as session from 'express-session'
import * as passport from 'passport'
import * as socketio from 'socket.io'

const PORT = process.env.PORT || 8080
const app = express()
module.exports = app


// This is a global Mocha hook, used for resource cleanup.
// Otherwise, Mocha v4+ never quits after tests.
// if (process.env.NODE_ENV === 'test') {
//   after('close the session store', () => sessionStore.stopExpiringSessions())
// }

/**
 * In your development environment, you can keep all of your
 * app's secret API keys in a file called `secrets.js`, in your project root. This file is included in the .gitignore - it will NOT be tracked
 */
// if (process.env.NODE_ENV !== 'production') require('../secrets')

// Session Repository



const createApp = (typeORMStore:TypeormStore, userRepository: Repository<User>) => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  // compression middleware
  app.use(compression())

  // session middleware with passport
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'my best friend is Cody',
      store: typeORMStore,
      resave: false,
      saveUninitialized: false
    })
  )

  app.use(passport.initialize())
  app.use(passport.session())


  // creates guests with session IDs as users
  app.use('*', async (req, res, next) => {
    try {
      if (!req.session.user) {
        //if you are logged in
        if (req.user) {
          req.session.user = req.user
        } else {
          //if you are a guest
          const newUser = new User;
          newUser.sessionId = req.session.id;
          const newUserUpdated = await userRepository.save(newUser)
          req.session.user = newUser
          req.user = newUser
        }
      }
      next()
    } catch (error) {
      next(error)
    }
  })

  // auth and api routes
  app.use('/auth', require('./auth'))
  app.use('/api', require('./api'))

  // static file-serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')))

  // any remaining requests with an extension (.js, .css, etc.) send 404
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (path.extname(req.path).length) {
      const err: Error = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  // sends index.html
  app.use('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  // error handling endware
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
  )

  // set up our socket control center
  const io = socketio(server)
  require('./socket')(io)
}


async function bootApp() {
  try {
    const connection: Connection = await createConnection()
    await connection.runMigrations()
    console.log("connection created to database")

    // connect to typeorm databases
    const sessionRepository: Repository<Session> = getRepository('Session')
    const userRepository: Repository<User> = getRepository('User')

    const typeORMStore = new TypeormStore({
      cleanupLimit: 2,
      limitSubquery: false,
      ttl: 86400
    }).connect(sessionRepository)

    //passport registration
    passport.serializeUser((user: User, done) => done(null, user.id))

    passport.deserializeUser(async (id: number, done) => {
      try {
        const user = await getRepository('User').findOne({
          select: ['id', 'email', 'username', 'profileImage'],
          where: { id: id },
        });
        done(null, user)
      } catch (err) {
        done(err)
      }
    })

    await createApp(typeORMStore, userRepository)
    await startListening()
  } catch (err) {
    console.error(err)
  }
}
// This evaluates as true when this file is run directly from the command line,
// i.e. 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// This will evaluate false when this module is required by another module - for example, in a test spec
// if (require.main === module) {
//   bootApp()
// } else {
//   createApp()
// }

bootApp();
