"use strict";
/**
 * This code was written by Tomas Coeli
 *
 * @DEVELOPER Tomas Coeli / +5493548637261 / Argentina / tcoeli@gigadata.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.routers = void 0;
// Routes
const location_router_1 = require("./location/location.router");
const weather_router_1 = require("./weather/weather.router");
exports.routers = [
    { path: 'location', router: location_router_1.locationRouter },
    { path: 'current', router: weather_router_1.weatherRouter },
    { path: 'forecast', router: weather_router_1.weatherForecastRouter }
];
