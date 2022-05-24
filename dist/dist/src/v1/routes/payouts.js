"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var payouts_1 = require("../controllers/payouts");
var router = express_1.default.Router();
router.route('/payouts').get(payouts_1.getPayouts);
router.route('/winning_pizzas').get(payouts_1.getWinningPizzas);
exports.default = router;
