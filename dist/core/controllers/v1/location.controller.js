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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocation = void 0;
// Services
const ip_api_service_1 = require("../../services/ip-api.service");
// Helpers
const helpers_1 = require("../../helpers/helpers");
const getLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const respApi = yield ip_api_service_1.getLocationByIp(yield helpers_1.getIpAddres(req));
        return helpers_1.respJson(res, 200, true, { data: respApi.data });
    }
    catch (e) {
        return helpers_1.respJson(res, 500, false, { msg: 'Ocurrio un Error, Contacte al administrador' });
    }
});
exports.getLocation = getLocation;
