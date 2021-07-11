"use strict";
/**
 * This code was written by Tomas Coeli
 *
 * @DEVELOPER Tomas Coeli / +5493548637261 / Argentina / tcoeli@gigadata.net
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataWeatherByNameCity = exports.getDataWeatherByLatLon = void 0;
// Axios
const axios_1 = __importDefault(require("axios"));
// Interfaces
require("../interfaces/opneWeather.interface");
const getDataWeatherByLatLon = (req, lat, lon, type) => axios_1.default({ method: 'GET', url: `${req.app.locals.URL.WEATHER}${type}?lat=${lat}&lon=${lon}&units=metric&appid=${req.app.locals.API_KEYS.OPEN_WEATHER}&exclude=minutely,hourly,alerts` });
exports.getDataWeatherByLatLon = getDataWeatherByLatLon;
const getDataWeatherByNameCity = (req, cityName, type) => axios_1.default({ method: 'GET', url: `${req.app.locals.URL.WEATHER}${type}?q=${cityName}&units=metric&appid=${req.app.locals.API_KEYS.OPEN_WEATHER}&exclude=minutely,hourly,alerts` });
exports.getDataWeatherByNameCity = getDataWeatherByNameCity;
