"use strict";
/**
 * This code was written by Tomas Coeli
 *
 * @DEVELOPER Tomas Coeli / +5493548637261 / Argentina / tcoeli@gigadata.net
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentStateWeatherForecastFiveDays = exports.getCurrentStateWeather = void 0;
// Services
const openWeathermap_service_1 = require("../../services/openWeathermap.service");
const ip_api_service_1 = require("../../services/ip-api.service");
// Helpers
const helpers_1 = require("../../helpers/helpers");
const getCurrentStateWeather = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { city } = req.params;
    try {
        let dataIp = {};
        let responseData = {};
        if (!city) {
            const respApi = yield ip_api_service_1.getLocationByIp(city ? city : yield helpers_1.getIpAddres(req));
            const _a = respApi.data, { status, query } = _a, data = __rest(_a, ["status", "query"]);
            dataIp = data;
            responseData = yield (yield openWeathermap_service_1.getDataWeatherByLatLon(req, data.lat, data.lon, 'weather')).data;
        }
        else {
            try {
                responseData = yield (yield openWeathermap_service_1.getDataWeatherByNameCity(req, city, 'weather')).data;
            }
            catch (e) {
                return helpers_1.respJson(res, 404, false, { msg: 'No se pudo encontrar la ciudad especifica, Ocurrio un Error' });
            }
        }
        const { cod } = responseData, dataWeather = __rest(responseData, ["cod"]);
        return helpers_1.respJson(res, 200, true, { data: Object.assign(Object.assign({}, dataIp), { weather: dataWeather }) });
    }
    catch (e) {
        console.log(e);
        return helpers_1.respJson(res, 500, false, { msg: 'Ocurrio un Error, Contacte al administrador' });
    }
});
exports.getCurrentStateWeather = getCurrentStateWeather;
const getCurrentStateWeatherForecastFiveDays = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { city } = req.params;
    try {
        let dataIp = {};
        let responseData = {};
        if (!city) {
            const respApi = yield ip_api_service_1.getLocationByIp(city ? city : yield helpers_1.getIpAddres(req));
            const _b = respApi.data, { status, query } = _b, data = __rest(_b, ["status", "query"]);
            dataIp = data;
            responseData = yield (yield openWeathermap_service_1.getDataWeatherByLatLon(req, data.lat, data.lon, 'onecall')).data;
        }
        else {
            try {
                const { coord } = yield (yield openWeathermap_service_1.getDataWeatherByNameCity(req, city, 'weather')).data;
                const { lon, lat } = coord;
                responseData = yield (yield openWeathermap_service_1.getDataWeatherByLatLon(req, lat, lon, 'onecall')).data;
            }
            catch (e) {
                return helpers_1.respJson(res, 404, false, { msg: 'No se pudo encontrar la ciudad especifica, Ocurrio un Error' });
            }
        }
        responseData.daily = responseData.daily.filter((x, i) => i <= 4);
        const { cod } = responseData, dataWeather = __rest(responseData, ["cod"]);
        return helpers_1.respJson(res, 200, true, Object.assign(Object.assign({}, dataIp), { weather: dataWeather }));
    }
    catch (e) {
        return helpers_1.respJson(res, 500, false, { msg: 'Ocurrio un Error, Contacte al administrador' });
    }
});
exports.getCurrentStateWeatherForecastFiveDays = getCurrentStateWeatherForecastFiveDays;
