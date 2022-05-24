"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ILazlosIngredients__factory = void 0;
var ethers_1 = require("ethers");
var _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "addr",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "balanceOfAddress",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "addr",
                type: "address",
            },
            {
                internalType: "uint256[]",
                name: "tokenIds",
                type: "uint256[]",
            },
            {
                internalType: "uint256[]",
                name: "amounts",
                type: "uint256[]",
            },
        ],
        name: "burnIngredients",
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
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "decreaseIngredientSupply",
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
        name: "getIngredient",
        outputs: [
            {
                components: [
                    {
                        internalType: "string",
                        name: "name",
                        type: "string",
                    },
                    {
                        internalType: "enum IngredientType",
                        name: "ingredientType",
                        type: "uint8",
                    },
                    {
                        internalType: "address",
                        name: "artist",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "price",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "supply",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "initialSupply",
                        type: "uint256",
                    },
                ],
                internalType: "struct Ingredient",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getNumIngredients",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "increaseIngredientSupply",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "addr",
                type: "address",
            },
            {
                internalType: "uint256[]",
                name: "tokenIds",
                type: "uint256[]",
            },
            {
                internalType: "uint256[]",
                name: "amounts",
                type: "uint256[]",
            },
        ],
        name: "mintIngredients",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
var ILazlosIngredients__factory = (function () {
    function ILazlosIngredients__factory() {
    }
    ILazlosIngredients__factory.createInterface = function () {
        return new ethers_1.utils.Interface(_abi);
    };
    ILazlosIngredients__factory.connect = function (address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    };
    ILazlosIngredients__factory.abi = _abi;
    return ILazlosIngredients__factory;
}());
exports.ILazlosIngredients__factory = ILazlosIngredients__factory;
