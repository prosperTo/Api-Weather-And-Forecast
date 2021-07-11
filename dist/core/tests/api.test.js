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
const server_1 = __importDefault(require("../../server/server"));
// Cors
const cors_1 = __importDefault(require("cors"));
const supertest_1 = __importDefault(require("supertest"));
// Routes
const index_router_1 = require("../router/index.router");
//Environments
const env_json_1 = __importDefault(require("../../server/env.json"));
/**
 * Testing Resolve Api Location
 */
// ------ Init Server ------ 
const a = server_1.default.instance.init();
// ------ Body Reading and Parsing ------ 
a.server.use(express_1.default.urlencoded({ limit: '100mb', extended: true }));
a.server.use(express_1.default.json({ limit: '100mb' }));
a.server.use(cors_1.default());
index_router_1.setRouter(a).then(() => {
    a.start().then((x) => { a.modifyLog('succeed', { text: `\x1b[36m ∞∞∞∞∞ Server Start at Port "${x[0]}", enviroment "${x[1]}", operator "${x[2]}", ${x[3]['NAME']} Api Ready to Response ∞∞∞∞∞\x1b[0m` }); });
    a.server.locals = env_json_1.default.DEV.TOM;
    describe('Comprobe Api Endpoints', () => {
        it('Response Api On Json Current Data of IP', (done) => { supertest_1.default(a.server).get('/api/v1/location').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, done); });
        it('Response Api on not send parameter city in enpoind current', (done) => { supertest_1.default(a.server).get('/api/v1/current').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, done); });
        it('Response Api on send parameter city in enpoind current', (done) => { supertest_1.default(a.server).get('/api/v1/current/Andorra').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, done); });
        it('Response Api on not send parameter city in enpoind forecast', (done) => { supertest_1.default(a.server).get('/api/v1/forecast').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, done); });
        it('Response Api on send parameter city in enpoind forecast', (done) => { supertest_1.default(a.server).get('/api/v1/forecast/Andorra').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, done); });
    });
});
