"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERC1155TokenReceiver__factory = void 0;
var ethers_1 = require("ethers");
var _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        name: "onERC1155BatchReceived",
        outputs: [
            {
                internalType: "bytes4",
                name: "",
                type: "bytes4",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        name: "onERC1155Received",
        outputs: [
            {
                internalType: "bytes4",
                name: "",
                type: "bytes4",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
];
var ERC1155TokenReceiver__factory = (function () {
    function ERC1155TokenReceiver__factory() {
    }
    ERC1155TokenReceiver__factory.createInterface = function () {
        return new ethers_1.utils.Interface(_abi);
    };
    ERC1155TokenReceiver__factory.connect = function (address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    };
    ERC1155TokenReceiver__factory.abi = _abi;
    return ERC1155TokenReceiver__factory;
}());
exports.ERC1155TokenReceiver__factory = ERC1155TokenReceiver__factory;
