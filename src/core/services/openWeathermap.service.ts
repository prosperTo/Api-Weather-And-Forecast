/**
 * This code was written by Tomas Coeli
 * 
 * @DEVELOPER Tomas Coeli / +5493548637261 / Argentina / tcoeli@gigadata.net
 */

// Core
import { Request } from 'express'

// Axios
import axios, { AxiosPromise } from 'axios'

// Interfaces
import '../interfaces/opneWeather.interface'


export const getDataWeatherByLatLon = (req: Request, lat: number, lon: number, type: string): AxiosPromise<responseWeatherApi.responseWeatherApiRoot> => axios({ method: 'GET', url: `${req.app.locals.URL.WEATHER}${type}?lat=${lat}&lon=${lon}&units=metric&appid=${req.app.locals.API_KEYS.OPEN_WEATHER}&exclude=minutely,hourly,alerts` })
export const getDataWeatherByNameCity = (req: Request, cityName: string, type: string): AxiosPromise<responseWeatherApi.responseWeatherApiRoot> => axios({ method: 'GET', url: `${req.app.locals.URL.WEATHER}${type}?q=${cityName}&units=metric&appid=${req.app.locals.API_KEYS.OPEN_WEATHER}&exclude=minutely,hourly,alerts` })