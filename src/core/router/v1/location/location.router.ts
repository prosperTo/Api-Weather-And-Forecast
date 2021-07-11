/**
 * This code was written by Tomas Coeli
 * 
 * @DEVELOPER Tomas Coeli / +5493548637261 / Argentina / tcoeli@gigadata.net
 */


// Core
import { Router } from 'express'

//Controllers
import { getLocation } from '../../../controllers/v1/location.controller'


export const locationRouter: Router = Router()

locationRouter.get('/', getLocation)