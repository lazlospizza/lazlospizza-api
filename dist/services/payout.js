"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePayouts = exports.getUnclaimedPayouts = exports.getArtistUnclaimedPayout = void 0;
var ethers_1 = require("ethers");
var typechain_types_1 = require("../typechain-types");
var pizza_1 = require("./pizza");
var lodash_1 = require("lodash");
var axios_1 = __importDefault(require("axios"));
var constants_1 = require("../constants");
var s3_1 = require("./s3");
var getArtistUnclaimedPayout = function () { return __awaiter(void 0, void 0, void 0, function () {
    var infuraProvider, contract, ingredients, artists, unclaimedTotal, i, artist, _allowedWithdrawalAmount, allowedWithdrawalAmount, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!process.env.MAIN_CONTRACT_ADDRESS)
                    throw 'missing main contract address';
                infuraProvider = new ethers_1.providers.InfuraProvider(process.env.ETH_NETWORK, process.env.INFURA_ID);
                contract = typechain_types_1.LazlosPizzaShop__factory.connect(process.env.MAIN_CONTRACT_ADDRESS, infuraProvider);
                return [4, (0, pizza_1.getIngredients)()];
            case 1:
                ingredients = _a.sent();
                artists = (0, lodash_1.uniq)(ingredients.map(function (_a) {
                    var artist = _a.artist;
                    return artist;
                }));
                unclaimedTotal = 0;
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < artists.length)) return [3, 7];
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                artist = artists[i];
                return [4, contract.artistAllowedWithdrawalAmount(artist)];
            case 4:
                _allowedWithdrawalAmount = _a.sent();
                allowedWithdrawalAmount = parseInt(_allowedWithdrawalAmount._hex, 16);
                if (allowedWithdrawalAmount > 0) {
                    unclaimedTotal += allowedWithdrawalAmount / constants_1.ETH;
                }
                return [3, 6];
            case 5:
                e_1 = _a.sent();
                console.log(e_1);
                return [3, 6];
            case 6:
                i += 1;
                return [3, 2];
            case 7: return [2, unclaimedTotal];
        }
    });
}); };
exports.getArtistUnclaimedPayout = getArtistUnclaimedPayout;
var getUnclaimedPayouts = function () { return __awaiter(void 0, void 0, void 0, function () {
    var infuraProvider, contract, res, payoutHistory, payoutAddresses, unclaimedPayouts, _loop_1, i;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!process.env.MAIN_CONTRACT_ADDRESS)
                    throw 'missing main contract address';
                if (!process.env.PAYOUT_DB)
                    throw 'missing payout db';
                infuraProvider = new ethers_1.providers.InfuraProvider(process.env.ETH_NETWORK, process.env.INFURA_ID);
                contract = typechain_types_1.LazlosPizzaShop__factory.connect(process.env.MAIN_CONTRACT_ADDRESS, infuraProvider);
                return [4, axios_1.default.get(process.env.PAYOUT_DB)];
            case 1:
                res = _b.sent();
                payoutHistory = res.data;
                payoutAddresses = Object.keys(payoutHistory);
                unclaimedPayouts = [];
                _loop_1 = function (i) {
                    var payouts = (_a = payoutHistory[payoutAddresses[i]]) === null || _a === void 0 ? void 0 : _a.map(function (payout) { return __awaiter(void 0, void 0, void 0, function () {
                        var isPaidOut;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, contract.isPaidOutForBlock(payoutAddresses[i], payout.block)];
                                case 1:
                                    isPaidOut = _a.sent();
                                    if (isPaidOut) {
                                        return [2, { address: payoutAddresses[i], payout: payout }];
                                    }
                                    return [2, null];
                            }
                        });
                    }); }).filter(function (payout) { return !!payout; });
                    unclaimedPayouts.push.apply(unclaimedPayouts, payouts);
                };
                for (i = 0; i < payoutAddresses.length; i += 1) {
                    _loop_1(i);
                }
                return [2, unclaimedPayouts];
        }
    });
}); };
exports.getUnclaimedPayouts = getUnclaimedPayouts;
var calculatePayouts = function () { return __awaiter(void 0, void 0, void 0, function () {
    var winningPizzasRes, winningPizzas, infuraProvider, _balance, balance, unclaimedPayouts, unclaimedPayoutsTotal, artistUnclaimedTotal, prizePool, developerRewards, creatorRewards, rarityRewards, now, payouts, rarityRewardPayouts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!process.env.MAIN_CONTRACT_ADDRESS)
                    throw 'missing main contract address';
                if (!process.env.WINNING_PIZZAS_DB)
                    throw 'missing winning pizzas db';
                return [4, axios_1.default.get(process.env.WINNING_PIZZAS_DB)];
            case 1:
                winningPizzasRes = _a.sent();
                winningPizzas = winningPizzasRes.data;
                infuraProvider = new ethers_1.providers.InfuraProvider(process.env.ETH_NETWORK, process.env.INFURA_ID);
                return [4, infuraProvider.getBalance(process.env.MAIN_CONTRACT_ADDRESS)];
            case 2:
                _balance = _a.sent();
                balance = parseInt(_balance._hex, 16) / constants_1.ETH;
                return [4, (0, exports.getUnclaimedPayouts)()];
            case 3:
                unclaimedPayouts = _a.sent();
                unclaimedPayoutsTotal = unclaimedPayouts.reduce(function (prev, current) {
                    var _a, _b;
                    return prev +
                        (((_a = current.payout) === null || _a === void 0 ? void 0 : _a.payout_amount) ? ((_b = current.payout) === null || _b === void 0 ? void 0 : _b.payout_amount) / constants_1.ETH : 0);
                }, 0);
                return [4, (0, exports.getArtistUnclaimedPayout)()];
            case 4:
                artistUnclaimedTotal = _a.sent();
                prizePool = balance - unclaimedPayoutsTotal - artistUnclaimedTotal;
                developerRewards = prizePool * 0.0025;
                creatorRewards = prizePool * 0.0075;
                rarityRewards = prizePool * 0.01;
                now = Date.now() / 1000;
                payouts = [
                    {
                        address: process.env.CREATOR_WALLET,
                        payout_amount: creatorRewards,
                        reason: 'Creator',
                        timestamp: now,
                    },
                    {
                        address: process.env.DEVELOPER_WALLET,
                        payout_amount: developerRewards,
                        reason: 'Developer',
                        timestamp: now,
                    },
                ];
                rarityRewardPayouts = winningPizzas.map(function (_a) {
                    var owner = _a.owner, tokenId = _a.tokenId, rarity = _a.rarity;
                    return ({
                        address: owner,
                        payout_amount: rarityRewards / winningPizzas.length,
                        reason: 'Rarity reward',
                        timestamp: now,
                        token_id: tokenId,
                        rarity: rarity,
                    });
                });
                return [4, (0, s3_1.uploadJsonToS3)([], s3_1.S3Folder.winning_pizzas)];
            case 5:
                _a.sent();
                return [2, __spreadArray(__spreadArray([], payouts, true), rarityRewardPayouts, true)];
        }
    });
}); };
exports.calculatePayouts = calculatePayouts;
