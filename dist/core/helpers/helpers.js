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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.respJson = exports.dateIsAfter = exports.dateIsBefore = exports.timestampToDate = exports.dateCustomToTimestamp = exports.dateCustom = exports.dateToTimestamp = exports.dateNowTimestamp = exports.dateNowFormat = exports.calculateDifDate = exports.countingHoursWorked = exports.getIpAddres = void 0;
const public_ip_1 = __importDefault(require("public-ip"));
const getIpAddres = (req) => __awaiter(void 0, void 0, void 0, function* () { return req.hostname === 'localhost' || req.hostname === '127.0.0.1' ? yield public_ip_1.default.v4() : req.hostname; });
exports.getIpAddres = getIpAddres;
/* Moment Js*/
const moment_1 = __importDefault(require("moment"));
const countingHoursWorked = (dateStart, dateFinish) => moment_1.default.duration(moment_1.default(exports.timestampToDate(dateStart, '')).diff(exports.timestampToDate(dateFinish, ''))).asHours();
exports.countingHoursWorked = countingHoursWorked;
const calculateDifDate = (dateStart, dateFinish, type) => { let hour = moment_1.default.duration(moment_1.default(exports.timestampToDate(dateStart, '')).diff(exports.timestampToDate(dateFinish, ''))); switch (type) {
    case 'hour': return hour.asHours();
    case 'minutes': return hour.asMinutes();
    case 'seconds': return hour.asSeconds();
    default: return hour;
} };
exports.calculateDifDate = calculateDifDate;
const dateNowFormat = (format) => moment_1.default().format(format);
exports.dateNowFormat = dateNowFormat;
const dateNowTimestamp = () => moment_1.default().unix();
exports.dateNowTimestamp = dateNowTimestamp;
const dateToTimestamp = (date) => moment_1.default(date).unix();
exports.dateToTimestamp = dateToTimestamp;
const dateCustom = (date, format) => moment_1.default(date).format(format);
exports.dateCustom = dateCustom;
const dateCustomToTimestamp = (date, format) => moment_1.default(date, format).unix();
exports.dateCustomToTimestamp = dateCustomToTimestamp;
const timestampToDate = (date, format) => moment_1.default(new Date(date * 1000)).format(format);
exports.timestampToDate = timestampToDate;
const dateIsBefore = (date, dateToCompare, format) => moment_1.default(date, format).subtract(1, 'seconds').isBefore(moment_1.default(dateToCompare, format));
exports.dateIsBefore = dateIsBefore;
const dateIsAfter = (date, dateToCompare, format) => moment_1.default(date, format).add(1, 'seconds').isAfter(moment_1.default(dateToCompare, format));
exports.dateIsAfter = dateIsAfter;
const respJson = (res, status, ok, others) => res.status(status).json(Object.assign({ ok, status }, others));
exports.respJson = respJson;
