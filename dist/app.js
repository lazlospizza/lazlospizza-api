"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var v1_1 = __importDefault(require("./v1"));
dotenv_1.default.config();
var TEN_MB = 10 * 1024 * 1024;
var app = (0, express_1.default)();
app.use(express_1.default.json({ limit: TEN_MB }));
app.use(express_1.default.urlencoded({ extended: false, limit: TEN_MB }));
app.use((0, cors_1.default)());
app.use('/api/v1', (0, v1_1.default)());
app.use(function (err, req, res, _) {
    res.status(err.status || 500);
    res.json({
        err: {
            message: err.message,
        },
    });
});
app.use(function (req, res, next) {
    var error = new Error('Route Not Found');
    error.message = '404';
    next(error);
    return res.status(404).send({
        message: 'Route Not Found',
    });
});
exports.default = app;
