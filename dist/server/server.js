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
// Core
const express_1 = __importDefault(require("express"));
// Enviroments
const env_json_1 = __importDefault(require("./env.json"));
// Other
const ora_1 = __importDefault(require("ora"));
// Helpers
const helpers_1 = require("../core/helpers/helpers");
class Server {
    constructor() {
        this.server = express_1.default();
        this.log = ora_1.default({ color: 'yellow', interval: 50, indent: 0 });
    }
    static get instance() { return this._instance || (this._instance = new this()); }
    init() { return new Server(); }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.checkParams().then((x) => __awaiter(this, void 0, void 0, function* () {
                try {
                    this.modifyLog('info', { text: `Iniciando Conexión con base de datos` });
                    this.modifyLog('succeed', { text: `Base de Datos Conectada Correctamente` });
                    this.modifyLog('info', { text: `Cargando Carpeta Publica` });
                    this.modifyLog('succeed', { text: `Carpeta Publica Cargada Correctamente` });
                    this.modifyLog('info', { text: `Revisando puerto ${x[0]} si esta libre` });
                    this.server.listen(x[0]);
                    this.modifyLog('succeed', { text: `Puerto Libre para Cargar API` });
                }
                catch (e) {
                    this.modifyLog('fail', { text: e });
                }
                return x;
            }));
        });
    }
    checkParams() {
        return __awaiter(this, void 0, void 0, function* () {
            const ENV = env_json_1.default;
            let port = '', env = '', op = '', err = '';
            for (const x of process.argv) {
                switch (x.split('=')[0]) {
                    case '--port':
                        port = yield x.split('=')[1];
                        break;
                    case '--env':
                        env = yield x.split('=')[1];
                        break;
                    case '--op':
                        op = yield x.split('=')[1];
                        break;
                    default: break;
                }
            }
            if (port === '')
                err += 'arg --port is not pass or is not Number, ';
            if (env === '')
                err += 'arg --env is not pass, ';
            if (op === '')
                err += 'arg --op is not pass, ';
            if (err !== '')
                throw new Error(err);
            this.server.locals = ENV[env][op];
            return [port, env, op, ENV[env][op]];
        });
    }
    modifyLog(type, opt) {
        switch (type) {
            case 'succeed':
                this.log.succeed(`${opt === null || opt === void 0 ? void 0 : opt.text} -- ${helpers_1.dateNowFormat('MMMM Do YYYY, h:mm:ss a')}`);
                break;
            case 'fail':
                this.log.fail(`${opt === null || opt === void 0 ? void 0 : opt.text} -- ${helpers_1.dateNowFormat('MMMM Do YYYY, h:mm:ss a')}`);
                break;
            case 'warn':
                this.log.warn(`${opt === null || opt === void 0 ? void 0 : opt.text} -- ${helpers_1.dateNowFormat('MMMM Do YYYY, h:mm:ss a')}`);
                break;
            case 'info':
                this.log.info(`${opt === null || opt === void 0 ? void 0 : opt.text} -- ${helpers_1.dateNowFormat('MMMM Do YYYY, h:mm:ss a')}`);
                break;
            default: break;
        }
    }
}
exports.default = Server;
