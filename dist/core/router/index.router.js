"use strict";
/**
 * This code was written by Tomas Coeli
 *
 * @DEVELOPER Tomas Coeli / +5493548637261 / Argentina / tcoeli@gigadata.net
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.setRouter = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const setRouter = (a) => __awaiter(void 0, void 0, void 0, function* () {
    const pathFull = path_1.default.dirname(__dirname);
    a.modifyLog('succeed', { text: 'Cargando Vercionamiento de Api' });
    for (const z of yield fs_1.default.readdirSync(`${pathFull}/router`)) {
        if (yield fs_1.default.lstatSync(`${pathFull}/router/${z}`).isDirectory()) {
            a.modifyLog('succeed', { text: `Versión ${z} Encontrada` });
            const routers = yield Promise.resolve().then(() => __importStar(require(`./${z}/index.router`)));
            let e = routers.routers.length, f = 1, g = 0;
            a.modifyLog('succeed', { text: `Se encontraron ${e} Rutas de Controladores` });
            for (const x of routers.routers) {
                a.modifyLog('info', { text: `${f}/${e}) Cargando Ruta api/${z}/${x.path}` });
                f++;
                try {
                    yield a.server.use(`/api/${z}/${x.path}`, x.router);
                }
                catch (e) {
                    a.modifyLog('fail', { text: `${f}/${e}) Error al Cargar el Controlador ${x.path}` });
                }
            }
            if (g === 0)
                a.modifyLog('succeed', { text: `Se Cargaron todos los Controladores Correctamente` });
            else if (g >= 1 && g <= routers.routers.length)
                a.modifyLog('warn', { text: `Algunos Controladores no se Cargaron Correctamente` });
            else
                a.modifyLog('fail', { text: `No se pudo Cargar ningun controlador` });
        }
    }
});
exports.setRouter = setRouter;
