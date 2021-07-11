"use strict";
/**
 * This code was written by Tomas Coeli
 *
 * @DEVELOPER Tomas Coeli / +5493548637261 / Argentina / tcoeli@gigadata.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.weatherForecastRouter = exports.weatherRouter = void 0;
// Core
const express_1 = require("express");
//Controllers
const weather_controller_1 = require("../../../controllers/v1/weather.controller");
exports.weatherRouter = express_1.Router();
exports.weatherRouter.get('/:city?', [
    (req, res, next) => { if (!req.params.weather)
        next(); },
], weather_controller_1.getCurrentStateWeather);
exports.weatherForecastRouter = express_1.Router();
exports.weatherForecastRouter.get('/:city?', [
    (req, res, next) => { if (!req.params.weather)
        next(); },
], weather_controller_1.getCurrentStateWeatherForecastFiveDays);
