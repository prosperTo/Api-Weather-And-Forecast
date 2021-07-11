/**
 * This code was written by Tomas Coeli
 * 
 * @DEVELOPER Tomas Coeli / +5493548637261 / Argentina / tcoeli@gigadata.net
 */

// Core
import { Router } from 'express'

// Routes
import { locationRouter } from './location/location.router'
import { weatherForecastRouter, weatherRouter } from './weather/weather.router'


export const routers: { path: string, router: Router }[] = [
    { path: 'location', router: locationRouter },
    { path: 'current', router: weatherRouter },
    { path: 'forecast', router: weatherForecastRouter }
]