"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ILazlosRendering__factory = void 0;
var ethers_1 = require("ethers");
var _abi = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
        name: "ingredientTokenMetadata",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
        name: "pizzaTokenMetadata",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
var ILazlosRendering__factory = (function () {
    function ILazlosRendering__factory() {
    }
    ILazlosRendering__factory.createInterface = function () {
        return new ethers_1.utils.Interface(_abi);
    };
    ILazlosRendering__factory.connect = function (address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    };
    ILazlosRendering__factory.abi = _abi;
    return ILazlosRendering__factory;
}());
exports.ILazlosRendering__factory = ILazlosRendering__factory;
