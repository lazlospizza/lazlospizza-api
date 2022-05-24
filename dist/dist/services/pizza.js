"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function () { if (t[0] & 1)
            throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f)
            throw new TypeError("Generator is already executing.");
        while (_)
            try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                    return t;
                if (y = 0, t)
                    op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0:
                    case 1:
                        t = op;
                        break;
                    case 4:
                        _.label++;
                        return { value: op[1], done: false };
                    case 5:
                        _.label++;
                        y = op[1];
                        op = [0];
                        continue;
                    case 7:
                        op = _.ops.pop();
                        _.trys.pop();
                        continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                            _ = 0;
                            continue;
                        }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                            _.label = op[1];
                            break;
                        }
                        if (op[0] === 6 && _.label < t[1]) {
                            _.label = t[1];
                            t = op;
                            break;
                        }
                        if (t && _.label < t[2]) {
                            _.label = t[2];
                            _.ops.push(op);
                            break;
                        }
                        if (t[2])
                            _.ops.pop();
                        _.trys.pop();
                        continue;
                }
                op = body.call(thisArg, _);
            }
            catch (e) {
                op = [6, e];
                y = 0;
            }
            finally {
                f = t = 0;
            }
        if (op[0] & 5)
            throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2)
        for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar)
                    ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveWinningPizzas = exports.getRarestPizzas = exports.getPizzas = exports.getIngredients = exports.PizzaKey = exports.IngredientKey = void 0;
var ethers_1 = require("ethers");
var typechain_types_1 = require("../typechain-types");
var constants_1 = require("../constants");
var s3_1 = require("./s3");
var axios_1 = __importDefault(require("axios"));
var IngredientKey;
(function (IngredientKey) {
    IngredientKey["name"] = "name";
    IngredientKey["ingredientType"] = "ingredientType";
    IngredientKey["artist"] = "artist";
    IngredientKey["price"] = "price";
    IngredientKey["supply"] = "supply";
})(IngredientKey = exports.IngredientKey || (exports.IngredientKey = {}));
var PizzaKey;
(function (PizzaKey) {
    PizzaKey["base"] = "base";
    PizzaKey["sauce"] = "sauce";
    PizzaKey["cheeses"] = "cheeses";
    PizzaKey["meats"] = "meats";
    PizzaKey["toppings"] = "toppings";
})(PizzaKey = exports.PizzaKey || (exports.PizzaKey = {}));
var pizzaKeys = [
    PizzaKey.base,
    PizzaKey.sauce,
    PizzaKey.cheeses,
    PizzaKey.meats,
    PizzaKey.toppings,
];
var ingredientKeys = [
    IngredientKey.name,
    IngredientKey.ingredientType,
    IngredientKey.artist,
    IngredientKey.price,
    IngredientKey.supply,
];
var ingredientTypes = [
    "Base",
    "Sauce",
    "Cheese",
    "Meat",
    "Topping",
];
var getIngredients = function () {
    return __awaiter(void 0, void 0, void 0, function () {
        var infuraProvider, contract, _numberOfIngredients, numberOfIngredients, ingredients;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!process.env.INGREDIENTS_CONTRACT_ADDRESS)
                        throw 'missing ingredients contract address';
                    infuraProvider = new ethers_1.providers.InfuraProvider(process.env.ETH_NETWORK, process.env.INFURA_ID);
                    contract = typechain_types_1.LazlosIngredients__factory.connect(process.env.INGREDIENTS_CONTRACT_ADDRESS, infuraProvider);
                    return [4, contract.numIngredients()];
                case 1:
                    _numberOfIngredients = _a.sent();
                    numberOfIngredients = parseInt(_numberOfIngredients._hex, 16);
                    return [4, Promise.all(Array.from(Array(numberOfIngredients).keys()).map(function (i) {
                            return __awaiter(void 0, void 0, void 0, function () {
                                var tokenId, _ingredient, uri, ingredient, i_1, uriString, uriJson;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            tokenId = i + 1;
                                            return [4, contract.getIngredient(tokenId)];
                                        case 1:
                                            _ingredient = _a.sent();
                                            return [4, contract.uri(tokenId)];
                                        case 2:
                                            uri = _a.sent();
                                            ingredient = { name: '', ingredientType: '', artist: '', price: '', supply: '' };
                                            for (i_1 = 0; i_1 < 5; i_1 += 1) {
                                                if (i_1 === 1) {
                                                    ingredient[ingredientKeys[i_1]] = ingredientTypes[_ingredient[i_1]];
                                                }
                                                else if (i_1 === 3) {
                                                    ingredient[ingredientKeys[i_1]] =
                                                        parseInt(_ingredient[i_1]._hex, 16) / constants_1.ETH;
                                                }
                                                else if (i_1 === 4) {
                                                    ingredient[ingredientKeys[i_1]] = parseInt(_ingredient[i_1]._hex, 16);
                                                }
                                                else {
                                                    ingredient[ingredientKeys[i_1]] = _ingredient[i_1];
                                                }
                                            }
                                            uriString = Buffer.from(uri.split(',')[1], 'base64').toString('ascii');
                                            uriJson = JSON.parse(uriString);
                                            return [2, __assign(__assign(__assign({}, uriJson), ingredient), { tokenId: tokenId })];
                                    }
                                });
                            });
                        }))];
                case 2:
                    ingredients = _a.sent();
                    return [2, ingredients];
            }
        });
    });
};
exports.getIngredients = getIngredients;
var getPizzas = function () {
    return __awaiter(void 0, void 0, void 0, function () {
        var infuraProvider, contract, _numberOfPizzas, numberOfPizzas, _ingredients, _pizzas, ingredients, pizzas;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!process.env.PIZZA_CONTRACT_ADDRESS)
                        throw 'missing pizza contract address';
                    infuraProvider = new ethers_1.providers.InfuraProvider(process.env.ETH_NETWORK, process.env.INFURA_ID);
                    contract = typechain_types_1.LazlosPizzas__factory.connect(process.env.PIZZA_CONTRACT_ADDRESS, infuraProvider);
                    return [4, contract.numPizzas()];
                case 1:
                    _numberOfPizzas = _a.sent();
                    numberOfPizzas = parseInt(_numberOfPizzas._hex, 16);
                    return [4, (0, exports.getIngredients)()];
                case 2:
                    _ingredients = _a.sent();
                    return [4, Promise.all(Array.from(Array(numberOfPizzas).keys()).map(function (i) {
                            return __awaiter(void 0, void 0, void 0, function () {
                                var tokenId, owner, _pizza, uri, pizza, i_2, uriString, uriJson;
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            tokenId = i + 1;
                                            return [4, contract.ownerOf(tokenId)];
                                        case 1:
                                            owner = _b.sent();
                                            if (owner === constants_1.ZERO_ADDRESS)
                                                return [2, null];
                                            return [4, contract.pizza(tokenId)];
                                        case 2:
                                            _pizza = _b.sent();
                                            return [4, contract.tokenURI(tokenId)];
                                        case 3:
                                            uri = _b.sent();
                                            pizza = {
                                                base: 0,
                                                sauce: 0,
                                                cheeses: [],
                                                meats: [],
                                                toppings: [],
                                                allIngredients: [],
                                            };
                                            for (i_2 = 0; i_2 < 5; i_2 += 1) {
                                                pizza[pizzaKeys[i_2]] = _pizza[i_2];
                                                if (i_2 <= 1) {
                                                    if (pizza[pizzaKeys[i_2]])
                                                        pizza === null || pizza === void 0 ? void 0 : pizza.allIngredients.push(pizza[pizzaKeys[i_2]]);
                                                }
                                                else {
                                                    if (pizza[pizzaKeys[i_2]])
                                                        pizza === null || pizza === void 0 ? void 0 : (_a = pizza.allIngredients).push.apply(_a, pizza[pizzaKeys[i_2]]);
                                                }
                                            }
                                            uriString = Buffer.from(uri.split(',')[1], 'base64').toString('ascii');
                                            uriJson = JSON.parse(uriString);
                                            return [2, __assign(__assign(__assign({}, uriJson), pizza), { tokenId: tokenId, owner: owner })];
                                    }
                                });
                            });
                        }))];
                case 3:
                    _pizzas = (_a.sent()).filter(function (p) { return !!p; });
                    ingredients = _ingredients.map(function (ingredient) {
                        var numberOfPizzas = _pizzas.filter(function (pizza) {
                            return pizza.allIngredients.find(function (tokenId) { return tokenId === ingredient.tokenId; });
                        }).length;
                        var rarity = (numberOfPizzas / _pizzas.length) * 100;
                        return __assign(__assign({}, ingredient), { numberOfPizzas: numberOfPizzas, rarity: rarity });
                    });
                    return [4, Promise.all(_pizzas.map(function (_pizza) {
                            return __awaiter(void 0, void 0, void 0, function () {
                                var pizza, _loop_1, i, ingredientsMissing, rarityIngredients, raritySum, rarity;
                                return __generator(this, function (_a) {
                                    pizza = __assign(__assign({}, _pizza), { allIngredients: [] });
                                    _loop_1 = function (i) {
                                        var _b;
                                        if (i <= 1) {
                                            pizza[pizzaKeys[i]] = ingredients.find(function (ingredient) { return ingredient.tokenId === _pizza[pizzaKeys[i]]; });
                                            if (pizza[pizzaKeys[i]])
                                                pizza === null || pizza === void 0 ? void 0 : pizza.allIngredients.push(pizza[pizzaKeys[i]]);
                                        }
                                        else {
                                            pizza[pizzaKeys[i]] = ingredients.filter(function (ingredient) {
                                                return _pizza[pizzaKeys[i]].includes(ingredient.tokenId);
                                            });
                                            if (pizza[pizzaKeys[i]])
                                                pizza === null || pizza === void 0 ? void 0 : (_b = pizza.allIngredients).push.apply(_b, pizza[pizzaKeys[i]]);
                                        }
                                    };
                                    for (i = 0; i < 5; i += 1) {
                                        _loop_1(i);
                                    }
                                    ingredientsMissing = ingredients
                                        .filter(function (ingredient) {
                                        return ingredient.ingredientType !== "Base" &&
                                            ingredient.ingredientType !== "Sauce" &&
                                            !pizza.allIngredients.find(function (i) { return i.tokenId === ingredient.tokenId; });
                                    })
                                        .map(function (ingredient) {
                                        var _a;
                                        return (__assign(__assign({}, ingredient), { rarity: 100 - ((_a = ingredient.rarity) !== null && _a !== void 0 ? _a : 0) }));
                                    });
                                    rarityIngredients = __spreadArray(__spreadArray([], pizza.allIngredients, true), ingredientsMissing, true);
                                    raritySum = rarityIngredients.reduce(function (prev, current) { var _a; return prev + ((_a = current.rarity) !== null && _a !== void 0 ? _a : 100); }, 0);
                                    rarity = raritySum / rarityIngredients.length;
                                    return [2, __assign(__assign({}, pizza), { rarity: rarity })];
                                });
                            });
                        }))];
                case 4:
                    pizzas = _a.sent();
                    return [2, { pizzas: pizzas, ingredients: ingredients }];
            }
        });
    });
};
exports.getPizzas = getPizzas;
var getRarestPizzas = function () {
    return __awaiter(void 0, void 0, void 0, function () {
        var pizzas, rarestPizzas, i, pizza;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, (0, exports.getPizzas)()];
                case 1:
                    pizzas = (_a.sent()).pizzas;
                    rarestPizzas = [];
                    for (i = 0; i < pizzas.length; i += 1) {
                        pizza = pizzas[i];
                        if ((pizza === null || pizza === void 0 ? void 0 : pizza.rarity) === undefined)
                            continue;
                        if (!rarestPizzas.length || pizza.rarity === rarestPizzas[0].rarity) {
                            rarestPizzas.push(pizza);
                        }
                        else if (pizza.rarity &&
                            rarestPizzas[0].rarity &&
                            rarestPizzas[0].rarity > pizza.rarity) {
                            rarestPizzas = [pizza];
                        }
                    }
                    return [2, rarestPizzas];
            }
        });
    });
};
exports.getRarestPizzas = getRarestPizzas;
var saveWinningPizzas = function () {
    return __awaiter(void 0, void 0, void 0, function () {
        var rarestPizzas, winningPizzasRes, winningPizzas;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!process.env.WINNING_PIZZAS_DB)
                        throw 'missing winning pizzas db';
                    console.log('getting the winning pizzas');
                    return [4, (0, exports.getRarestPizzas)()];
                case 1:
                    rarestPizzas = _c.sent();
                    return [4, axios_1.default.get(process.env.WINNING_PIZZAS_DB)];
                case 2:
                    winningPizzasRes = _c.sent();
                    winningPizzas = winningPizzasRes.data;
                    if (((_a = rarestPizzas[0]) === null || _a === void 0 ? void 0 : _a.rarity) &&
                        ((_b = winningPizzas[0]) === null || _b === void 0 ? void 0 : _b.rarity) &&
                        rarestPizzas[0].rarity > winningPizzas[0].rarity)
                        return [2, null];
                    return [4, (0, s3_1.uploadJsonToS3)(winningPizzas, s3_1.S3Folder.winning_pizzas)];
                case 3:
                    _c.sent();
                    return [2];
            }
        });
    });
};
exports.saveWinningPizzas = saveWinningPizzas;
