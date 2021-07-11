/**
 * This code was written by Tomas Coeli
 * 
 * @DEVELOPER Tomas Coeli / +5493548637261 / Argentina / tcoeli@gigadata.net
 */


// Core
import { Request, Response } from 'express'

// Services
import { getDataWeatherByLatLon, getDataWeatherByNameCity } from '../../services/openWeathermap.service'
import { getLocationByIp } from '../../services/ip-api.service'

// Helpers
import { getIpAddres, respJson } from '../../helpers/helpers'



export const getCurrentStateWeather = async (req: Request, res: Response) => {
    const { city } = req.params
    try {
        let dataIp = {}
        let responseData: any = {}
        if(!city) {
            const respApi = await getLocationByIp(city ? city : await getIpAddres(req))
            const { status, query, ...data } = respApi.data
            dataIp = data
            responseData = await (await getDataWeatherByLatLon(req, data.lat, data.lon, 'weather')).data
        } else {
            try {
                responseData = await (await getDataWeatherByNameCity(req, city, 'weather')).data
            } catch (e) { return respJson(res, 404, false, { msg: 'No se pudo encontrar la ciudad especifica, Ocurrio un Error'}) }
        }

        const { cod, ...dataWeather } = responseData
        return respJson(res, 200, true, { data: { ...dataIp, weather: dataWeather } }) 
    } catch (e) { console.log(e); return respJson(res, 500, false, { msg: 'Ocurrio un Error, Contacte al administrador'}) }
}

export const getCurrentStateWeatherForecastFiveDays = async (req: Request, res: Response) => {
    const { city } = req.params
    try {
        let dataIp = {}
        let responseData: any = {}
        if(!city) {
            const respApi = await getLocationByIp(city ? city : await getIpAddres(req))
            const { status, query, ...data } = respApi.data
            dataIp = data
            responseData = await (await getDataWeatherByLatLon(req, data.lat, data.lon, 'onecall')).data
        } else {
            try {
                const { coord } = await (await getDataWeatherByNameCity(req, city, 'weather')).data
                const { lon, lat } = coord
                responseData = await (await getDataWeatherByLatLon(req, lat, lon, 'onecall')).data
            } catch (e) { return respJson(res, 404, false, { msg: 'No se pudo encontrar la ciudad especifica, Ocurrio un Error'}) }
        }
        responseData.daily = responseData.daily.filter((x: any, i: number) => i <= 4)

        const { cod, ...dataWeather } = responseData
        return respJson(res, 200, true, { ...dataIp, weather: dataWeather })

    } catch (e) { return respJson(res, 500, false, { msg: 'Ocurrio un Error, Contacte al administrador'}) }
}