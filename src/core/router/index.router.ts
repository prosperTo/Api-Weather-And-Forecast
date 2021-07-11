/**
 * This code was written by Tomas Coeli
 * 
 * @DEVELOPER Tomas Coeli / +5493548637261 / Argentina / tcoeli@gigadata.net
 */

// Core
import { Router } from 'express'
import Server from '../../server/server'
import fs from 'fs'
import path from 'path'

export const setRouter = async (a: Server) => {
    const pathFull = path.dirname(__dirname)
    a.modifyLog('succeed', {text: 'Cargando Vercionamiento de Api'})
    for (const z of await fs.readdirSync(`${pathFull}/router`)) {
        if( await fs.lstatSync(`${pathFull}/router/${z}`).isDirectory()) {
            a.modifyLog('succeed', {text: `Versión ${z} Encontrada`})
            const routers: {routers: {path: string, router: Router}[]} = await import(`./${z}/index.router`)
            let e: number = routers.routers.length, f: number = 1, g: number = 0
            a.modifyLog('succeed', {text: `Se encontraron ${e} Rutas de Controladores`})
            for(const x of routers.routers) {
                a.modifyLog('info', {text: `${f}/${e}) Cargando Ruta api/${z}/${x.path}`}); f++
                try { await a.server.use(`/api/${z}/${x.path}` , x.router) } catch (e) { a.modifyLog('fail', {text: `${f}/${e}) Error al Cargar el Controlador ${x.path}`}) }
            } 
            if(g === 0) a.modifyLog('succeed', {text: `Se Cargaron todos los Controladores Correctamente`})
            else if(g >= 1 && g <= routers.routers.length) a.modifyLog('warn', {text: `Algunos Controladores no se Cargaron Correctamente`})
            else a.modifyLog('fail', {text: `No se pudo Cargar ningun controlador`})
        }
    }
}