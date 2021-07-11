/**
 * This code was written by Tomas Coeli
 * 
 * @DEVELOPER Tomas Coeli / +5493548637261 / Argentina / tcoeli@gigadata.net
 */

// Core
import express from 'express'

// Enviroments
import ENVIROMENTS from './env.json'

// Other
import ora from 'ora'

// Helpers
import { dateNowFormat } from '../core/helpers/helpers'

export default class Server {

    private static _instance: Server
    public server: express.Application
    private log: any

    constructor() { 
        this.server = express() 
        this.log = ora({ color: 'yellow', interval: 50, indent: 0 })
    }

    public static get instance() { return this._instance || (this._instance = new this()) }

    public init (): Server { return new Server() }

    public async start(): Promise<string[]> {
        return this.checkParams().then(async (x: any[]) => {
            try {
                this.modifyLog('info', {text: `Iniciando Conexión con base de datos`})
                this.modifyLog('succeed', {text: `Base de Datos Conectada Correctamente`})
                this.modifyLog('info', {text: `Cargando Carpeta Publica`})
                this.modifyLog('succeed', {text: `Carpeta Publica Cargada Correctamente`})
                this.modifyLog('info', {text: `Revisando puerto ${x[0]} si esta libre`})
                this.server.listen(x[0])
                this.modifyLog('succeed', {text: `Puerto Libre para Cargar API`})
            } catch (e) { this.modifyLog('fail', {text: e}) }
            return x
        })
    }

    private async checkParams() {
        const ENV: any = ENVIROMENTS
        let port: string = '', env: string = '', op: string = '', err = '';
        for(const x of process.argv) { switch (x.split('=')[0]) { case '--port': port = await x.split('=')[1]; break;  case '--env': env = await x.split('=')[1]; break; case '--op': op = await x.split('=')[1]; break; default: break } }
        if(port === '') err += 'arg --port is not pass or is not Number, '; if(env === '') err += 'arg --env is not pass, '; if(op === '') err += 'arg --op is not pass, '; if(err !== '') throw new Error(err)
        this.server.locals = ENV[env][op]
        return [port, env, op, ENV[env][op]]
    }

    public modifyLog(type: string, opt?: { text: string}) {
        switch (type) {
            case 'succeed': this.log.succeed(`${opt?.text} -- ${dateNowFormat('MMMM Do YYYY, h:mm:ss a')}`); break
            case 'fail': this.log.fail(`${opt?.text} -- ${dateNowFormat('MMMM Do YYYY, h:mm:ss a')}`); break
            case 'warn': this.log.warn(`${opt?.text} -- ${dateNowFormat('MMMM Do YYYY, h:mm:ss a')}`); break
            case 'info': this.log.info(`${opt?.text} -- ${dateNowFormat('MMMM Do YYYY, h:mm:ss a')}`); break
            default: break;
        }
    }

}