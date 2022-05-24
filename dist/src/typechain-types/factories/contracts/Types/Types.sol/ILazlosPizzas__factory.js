"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ILazlosPizzas__factory = void 0;
var ethers_1 = require("ethers");
var _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "baker",
                type: "address",
            },
            {
                components: [
                    {
                        internalType: "uint16",
                        name: "base",
                        type: "uint16",
                    },
                    {
                        internalType: "uint16",
                        name: "sauce",
                        type: "uint16",
                    },
                    {
                        internalType: "uint16[3]",
                        name: "cheeses",
                        type: "uint16[3]",
                    },
                    {
                        internalType: "uint16[4]",
                        name: "meats",
                        type: "uint16[4]",
                    },
                    {
                        internalType: "uint16[4]",
                        name: "toppings",
                        type: "uint16[4]",
                    },
                ],
                internalType: "struct Pizza",
                name: "pizza",
                type: "tuple",
            },
        ],
        name: "bake",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "burn",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "pizza",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint16",
                        name: "base",
                        type: "uint16",
                    },
                    {
                        internalType: "uint16",
                        name: "sauce",
                        type: "uint16",
                    },
                    {
                        internalType: "uint16[3]",
                        name: "cheeses",
                        type: "uint16[3]",
                    },
                    {
                        internalType: "uint16[4]",
                        name: "meats",
                        type: "uint16[4]",
                    },
                    {
                        internalType: "uint16[4]",
                        name: "toppings",
                        type: "uint16[4]",
                    },
                ],
                internalType: "struct Pizza",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "baker",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "pizzaTokenId",
                type: "uint256",
            },
            {
                components: [
                    {
                        internalType: "uint16",
                        name: "base",
                        type: "uint16",
                    },
                    {
                        internalType: "uint16",
                        name: "sauce",
                        type: "uint16",
                    },
                    {
                        internalType: "uint16[3]",
                        name: "cheeses",
                        type: "uint16[3]",
                    },
                    {
                        internalType: "uint16[4]",
                        name: "meats",
                        type: "uint16[4]",
                    },
                    {
                        internalType: "uint16[4]",
                        name: "toppings",
                        type: "uint16[4]",
                    },
                ],
                internalType: "struct Pizza",
                name: "pizza",
                type: "tuple",
            },
        ],
        name: "rebake",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
var ILazlosPizzas__factory = (function () {
    function ILazlosPizzas__factory() {
    }
    ILazlosPizzas__factory.createInterface = function () {
        return new ethers_1.utils.Interface(_abi);
    };
    ILazlosPizzas__factory.connect = function (address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    };
    ILazlosPizzas__factory.abi = _abi;
    return ILazlosPizzas__factory;
}());
exports.ILazlosPizzas__factory = ILazlosPizzas__factory;
