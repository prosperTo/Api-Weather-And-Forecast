/**
 * This code was written by Tomas Coeli
 * 
 * @DEVELOPER Tomas Coeli / +5493548637261 / Argentina / tcoeli@gigadata.net
 */

// Core
import express from 'express'
import Server from './server/server'

// Cors
import cors from 'cors'

// Routes
import { setRouter } from './core/router/index.router'

// ------ Init Server ------ 
const a = Server.instance.init()

// ------ Body Reading and Parsing ------ 
a.server.use(express.urlencoded({limit: '100mb', extended: true}))
a.server.use(express.json({limit: '100mb'}))
a.server.use(cors())
setRouter(a).then(() => a.start().then((x: any[]) => { a.modifyLog('succeed', {text: `\x1b[36m ∞∞∞∞∞ Server Start at Port "${x[0]}", enviroment "${x[1]}", operator "${x[2]}", ${x[3]['NAME']} Api Ready to Response ∞∞∞∞∞\x1b[0m`}) } ))

export default a