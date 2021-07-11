/**
 * This code was written by Tomas Coeli
 * 
 * @DEVELOPER Tomas Coeli / +5493548637261 / Argentina / tcoeli@gigadata.net
 */


// Core
import { Request, Response } from 'express'

// Services
import { getLocationByIp } from '../../services/ip-api.service'

// Helpers
import { getIpAddres, respJson } from '../../helpers/helpers'


export const getLocation = async (req: Request, res: Response) => {
    try {
        const respApi = await getLocationByIp(await getIpAddres(req))
        return respJson(res, 200, true, { data: respApi.data })
    } catch (e) { return respJson(res, 500, false, { msg: 'Ocurrio un Error, Contacte al administrador'}) }
}