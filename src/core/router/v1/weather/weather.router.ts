/**
 * This code was written by Tomas Coeli
 * 
 * @DEVELOPER Tomas Coeli / +5493548637261 / Argentina / tcoeli@gigadata.net
 */


// Core
import { Request, Response, Router } from 'express'

//Controllers
import { getCurrentStateWeather, getCurrentStateWeatherForecastFiveDays } from '../../../controllers/v1/weather.controller'


export const weatherRouter: Router = Router()

weatherRouter.get('/:city?', [ 
    (req: Request, res:Response, next: CallableFunction) => { if(!req.params.weather) next() },
], getCurrentStateWeather)


export const weatherForecastRouter: Router = Router()

weatherForecastRouter.get('/:city?', [ 
    (req: Request, res:Response, next: CallableFunction) => { if(!req.params.weather) next() },
], getCurrentStateWeatherForecastFiveDays)