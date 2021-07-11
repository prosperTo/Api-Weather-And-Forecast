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
exports.getLocationByIp = void 0;
// Axios
const axios_1 = __importDefault(require("axios"));
const getLocationByIp = (ip) => axios_1.default({ method: 'GET', url: `http://ip-api.com/json/${ip}` });
exports.getLocationByIp = getLocationByIp;
