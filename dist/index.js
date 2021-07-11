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
// Core
const express_1 = __importDefault(require("express"));
const server_1 = __importDefault(require("./server/server"));
// Cors
const cors_1 = __importDefault(require("cors"));
// Routes
const index_router_1 = require("./core/router/index.router");
// ------ Init Server ------ 
const a = server_1.default.instance.init();
// ------ Body Reading and Parsing ------ 
a.server.use(express_1.default.urlencoded({ limit: '100mb', extended: true }));
a.server.use(express_1.default.json({ limit: '100mb' }));
a.server.use(cors_1.default());
index_router_1.setRouter(a).then(() => a.start().then((x) => { a.modifyLog('succeed', { text: `\x1b[36m ∞∞∞∞∞ Server Start at Port "${x[0]}", enviroment "${x[1]}", operator "${x[2]}", ${x[3]['NAME']} Api Ready to Response ∞∞∞∞∞\x1b[0m` }); }));
exports.default = a;
