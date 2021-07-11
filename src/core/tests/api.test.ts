/**
 * This code was written by Tomas Coeli
 * 
 * @DEVELOPER Tomas Coeli / +5493548637261 / Argentina / tcoeli@gigadata.net
 */

// Core
import express from 'express'
import Server from '../../server/server'

// Cors
import cors from 'cors'
import request from 'supertest'

// Routes
import { setRouter } from '../router/index.router'

//Environments
import ENV from '../../server/env.json'

/**
 * Testing Resolve Api Location
 */


// ------ Init Server ------ 
const a = Server.instance.init()

// ------ Body Reading and Parsing ------ 
a.server.use(express.urlencoded({limit: '100mb', extended: true}))
a.server.use(express.json({limit: '100mb'}))
a.server.use(cors())
setRouter(a).then(() => {
    a.start().then((x: any[]) => { a.modifyLog('succeed', {text: `\x1b[36m ∞∞∞∞∞ Server Start at Port "${x[0]}", enviroment "${x[1]}", operator "${x[2]}", ${x[3]['NAME']} Api Ready to Response ∞∞∞∞∞\x1b[0m`}) } )
    a.server.locals = ENV.DEV.TOM
    describe('Comprobe Api Endpoints', () => {
        it('Response Api On Json Current Data of IP', (done: any) => { request(a.server).get('/api/v1/location').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, done) })
        it('Response Api on not send parameter city in enpoind current', (done: any) => { request(a.server).get('/api/v1/current').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, done) })
        it('Response Api on send parameter city in enpoind current', (done: any) => { request(a.server).get('/api/v1/current/Andorra').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, done) })
        it('Response Api on not send parameter city in enpoind forecast', (done: any) => { request(a.server).get('/api/v1/forecast').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, done) })
        it('Response Api on send parameter city in enpoind forecast', (done: any) => { request(a.server).get('/api/v1/forecast/Andorra').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, done) })
    })
})




