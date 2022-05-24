"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var pizzas_1 = require("../controllers/pizzas");
var router = express_1.default.Router();
router.route('/pizzas').get(pizzas_1.getPizzas);
exports.default = router;
