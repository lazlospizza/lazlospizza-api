"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initListeners = exports.onMintOrBurn = void 0;
var ethers_1 = require("ethers");
var typechain_types_1 = require("../typechain-types");
var pizza_1 = require("./pizza");
var ZeroAddress = '0x0000000000000000000000000000000000000000';
var onMintOrBurn = function (from, to) {
    if (from === ZeroAddress || to === ZeroAddress) {
        console.log('something got minted or burned');
        try {
            (0, pizza_1.saveWinningPizzas)();
        }
        catch (e) {
            console.log(e);
        }
    }
};
exports.onMintOrBurn = onMintOrBurn;
var initListeners = function () {
    if (!process.env.MAIN_CONTRACT_ADDRESS)
        throw 'missing main contract address';
    if (!process.env.PIZZA_CONTRACT_ADDRESS)
        throw 'missing pizza contract address';
    if (!process.env.INGREDIENTS_CONTRACT_ADDRESS)
        throw 'missing ingredients contract address';
    console.log('Connecting to', process.env.ETH_NETWORK);
    console.log('Main contract address', process.env.PIZZA_CONTRACT_ADDRESS);
    var infuraProvider = new ethers_1.providers.InfuraProvider(process.env.ETH_NETWORK, process.env.INFURA_ID);
    var pizzaContract = typechain_types_1.LazlosPizzas__factory.connect(process.env.PIZZA_CONTRACT_ADDRESS, infuraProvider);
    var ingredientsContract = typechain_types_1.LazlosIngredients__factory.connect(process.env.INGREDIENTS_CONTRACT_ADDRESS, infuraProvider);
    pizzaContract.on('Transfer', function (from, to, id, txn) {
        return (0, exports.onMintOrBurn)(from, to);
    });
    ingredientsContract.on('TransferBatch', function (operator, from, to, ids, amounts, txn) { return (0, exports.onMintOrBurn)(from, to); });
    ingredientsContract.on('TransferSingle', function (operator, from, to, ids, amounts, txn) { return (0, exports.onMintOrBurn)(from, to); });
};
exports.initListeners = initListeners;
