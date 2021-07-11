"use strict";
/**
 * This code was written by Tomas Coeli
 *
 * @DEVELOPER Tomas Coeli / +5493548637261 / Argentina / tcoeli@gigadata.net
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationRouter = void 0;
// Core
const express_1 = require("express");
//Controllers
const location_controller_1 = require("../../../controllers/v1/location.controller");
exports.locationRouter = express_1.Router();
exports.locationRouter.get('/', location_controller_1.getLocation);
