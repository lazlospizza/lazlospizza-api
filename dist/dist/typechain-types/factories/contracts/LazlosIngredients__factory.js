"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.LazlosIngredients__factory = void 0;
var ethers_1 = require("ethers");
var _abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "ApprovalForAll",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256[]",
                name: "ids",
                type: "uint256[]",
            },
            {
                indexed: false,
                internalType: "uint256[]",
                name: "amounts",
                type: "uint256[]",
            },
        ],
        name: "TransferBatch",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "TransferSingle",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "string",
                name: "value",
                type: "string",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
        name: "URI",
        type: "event",
    },
    {
        inputs: [
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
                name: "ingredient",
                type: "tuple",
            },
        ],
        name: "addIngredient",
        outputs: [],
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
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "balanceOf",
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
                internalType: "address[]",
                name: "owners",
                type: "address[]",
            },
            {
                internalType: "uint256[]",
                name: "ids",
                type: "uint256[]",
            },
        ],
        name: "balanceOfBatch",
        outputs: [
            {
                internalType: "uint256[]",
                name: "balances",
                type: "uint256[]",
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
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "decreaseIngredientTotalSupply",
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
        name: "increaseIngredientTotalSupply",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "ingredients",
        outputs: [
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
        stateMutability: "view",
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
        ],
        name: "isApprovedForAll",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
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
        name: "mintIngredients",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "numIngredients",
        outputs: [
            {
                internalType: "uint256",
                name: "_value",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "pizzaShopContractAddress",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "renderingContractAddress",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256[]",
                name: "ids",
                type: "uint256[]",
            },
            {
                internalType: "uint256[]",
                name: "amounts",
                type: "uint256[]",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "safeBatchTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "setApprovalForAll",
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
        ],
        name: "setPizzaShopContractAddress",
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
        ],
        name: "setRenderingContractAddress",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes4",
                name: "interfaceId",
                type: "bytes4",
            },
        ],
        name: "supportsInterface",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
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
        name: "uri",
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
var _bytecode = "0x60806040523480156200001157600080fd5b5062000032620000266200003860201b60201c565b6200004060201b60201c565b62000106565b600033905090565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b61385f80620001166000396000f3fe608060405234801561001057600080fd5b50600436106101a85760003560e01c8063715018a6116100f9578063c5fd9c6f11610097578063e985e9c511610071578063e985e9c5146104b8578063ed81bb70146104e8578063f242432a14610506578063f2fde38b14610522576101a8565b8063c5fd9c6f14610450578063cdbaa12714610480578063d872712b1461049c576101a8565b8063a22cb465116100d3578063a22cb465146103de578063ae0cd5af146103fa578063b5571ed414610416578063c074f41214610432576101a8565b8063715018a614610398578063795c0a4b146103a25780638da5cb5b146103c0576101a8565b80632d1653821161016657806342237b951161014057806342237b95146102fe57806345adc2101461031a5780634e1273f41461034a578063520d27e71461037a576101a8565b80632d165382146102915780632eb2c2d6146102c657806341eb15ed146102e2576101a8565b8062fdd58e146101ad57806301ffc9a7146101dd5780630452d8ed1461020d5780630e89341c1461022957806312b40a9f1461025957806313a5e9c514610275575b600080fd5b6101c760048036038101906101c2919061247a565b61053e565b6040516101d491906124c9565b60405180910390f35b6101f760048036038101906101f2919061253c565b610563565b6040516102049190612584565b60405180910390f35b6102276004803603810190610222919061259f565b6105f5565b005b610243600480360381019061023e91906125cc565b6106b5565b6040516102509190612692565b60405180910390f35b610273600480360381019061026e919061259f565b61076e565b005b61028f600480360381019061028a91906127fc565b61082e565b005b6102ab60048036038101906102a691906125cc565b6108ce565b6040516102bd9695949392919061290d565b60405180910390f35b6102e060048036038101906102db9190612a2a565b6109bf565b005b6102fc60048036038101906102f79190612af9565b610e1e565b005b61031860048036038101906103139190612af9565b610ef8565b005b610334600480360381019061032f919061247a565b610fb0565b60405161034191906124c9565b60405180910390f35b610364600480360381019061035f9190612bfc565b61100a565b6040516103719190612d32565b60405180910390f35b610382611161565b60405161038f91906124c9565b60405180910390f35b6103a061116d565b005b6103aa6111f5565b6040516103b79190612d54565b60405180910390f35b6103c861121b565b6040516103d59190612d54565b60405180910390f35b6103f860048036038101906103f39190612d9b565b611245565b005b610414600480360381019061040f9190612af9565b611342565b005b610430600480360381019061042b91906127fc565b61141c565b005b61043a6114cc565b6040516104479190612d54565b60405180910390f35b61046a600480360381019061046591906125cc565b6114f2565b6040516104779190612ecc565b60405180910390f35b61049a6004803603810190610495919061307a565b611660565b005b6104b660048036038101906104b19190612af9565b6117c1565b005b6104d260048036038101906104cd91906130c3565b611879565b6040516104df9190612584565b60405180910390f35b6104f06118a8565b6040516104fd91906124c9565b60405180910390f35b610520600480360381019061051b9190613103565b6118b9565b005b61053c6004803603810190610537919061259f565b611c78565b005b6000602052816000526040600020602052806000526040600020600091509150505481565b60006301ffc9a760e01b827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806105be575063d9b67a2660e01b827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b806105ee5750630e89341c60e01b827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b9050919050565b6105fd611d70565b73ffffffffffffffffffffffffffffffffffffffff1661061b61121b565b73ffffffffffffffffffffffffffffffffffffffff1614610671576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610668906131e6565b60405180910390fd5b80600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6060600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16638c946016836040518263ffffffff1660e01b815260040161071291906124c9565b60006040518083038186803b15801561072a57600080fd5b505afa15801561073e573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f820116820180604052508101906107679190613276565b9050919050565b610776611d70565b73ffffffffffffffffffffffffffffffffffffffff1661079461121b565b73ffffffffffffffffffffffffffffffffffffffff16146107ea576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107e1906131e6565b60405180910390fd5b80600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146108be576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108b590613331565b60405180910390fd5b6108c9838383611d78565b505050565b60046020528060005260406000206000915090508060000180546108f190613380565b80601f016020809104026020016040519081016040528092919081815260200182805461091d90613380565b801561096a5780601f1061093f5761010080835404028352916020019161096a565b820191906000526020600020905b81548152906001019060200180831161094d57829003601f168201915b5050505050908060010160009054906101000a900460ff16908060010160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020154908060030154908060040154905086565b60008351905082518114610a08576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109ff906133fe565b60405180910390fd5b8573ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161480610ac85750600160008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b610b07576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610afe9061346a565b60405180910390fd5b60008060005b83811015610c2657868181518110610b2857610b2761348a565b5b60200260200101519250858181518110610b4557610b4461348a565b5b60200260200101519150816000808b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008581526020019081526020016000206000828254610bae91906134e8565b92505081905550816000808a73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008581526020019081526020016000206000828254610c14919061351c565b92505081905550806001019050610b0d565b508673ffffffffffffffffffffffffffffffffffffffff168873ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8989604051610c9d929190613572565b60405180910390a460008773ffffffffffffffffffffffffffffffffffffffff163b14610da35763bc197c8160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168773ffffffffffffffffffffffffffffffffffffffff1663bc197c81338b8a8a8a6040518663ffffffff1660e01b8152600401610d2c9594939291906135fe565b602060405180830381600087803b158015610d4657600080fd5b505af1158015610d5a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d7e919061367b565b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614610dd5565b600073ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff1614155b610e14576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e0b906136f4565b60405180910390fd5b5050505050505050565b610e26611d70565b73ffffffffffffffffffffffffffffffffffffffff16610e4461121b565b73ffffffffffffffffffffffffffffffffffffffff1614610e9a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e91906131e6565b60405180910390fd5b80600460008481526020019081526020016000206003016000828254610ec091906134e8565b9250508190555080600460008481526020019081526020016000206004016000828254610eed91906134e8565b925050819055505050565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610f88576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f7f90613331565b60405180910390fd5b8060046000848152602001908152602001600020600301600082825401925050819055505050565b60008060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600083815260200190815260200160002054905092915050565b606060008351905082518114611055576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161104c906133fe565b60405180910390fd5b8067ffffffffffffffff81111561106f5761106e6126b9565b5b60405190808252806020026020018201604052801561109d5781602001602082028036833780820191505090505b50915060005b81811015611159576000808683815181106110c1576110c061348a565b5b602002602001015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008583815181106111185761111761348a565b5b60200260200101518152602001908152602001600020548382815181106111425761114161348a565b5b6020026020010181815250508060010190506110a3565b505092915050565b60038060000154905081565b611175611d70565b73ffffffffffffffffffffffffffffffffffffffff1661119361121b565b73ffffffffffffffffffffffffffffffffffffffff16146111e9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111e0906131e6565b60405180910390fd5b6111f36000611ef7565b565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b80600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31836040516113369190612584565b60405180910390a35050565b61134a611d70565b73ffffffffffffffffffffffffffffffffffffffff1661136861121b565b73ffffffffffffffffffffffffffffffffffffffff16146113be576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113b5906131e6565b60405180910390fd5b806004600084815260200190815260200160002060030160008282546113e4919061351c565b9250508190555080600460008481526020019081526020016000206004016000828254611411919061351c565b925050819055505050565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146114ac576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114a390613331565b60405180910390fd5b6114c783838360405180602001604052806000815250611fbd565b505050565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6114fa6122d1565b600460008381526020019081526020016000206040518060c001604052908160008201805461152890613380565b80601f016020809104026020016040519081016040528092919081815260200182805461155490613380565b80156115a15780601f10611576576101008083540402835291602001916115a1565b820191906000526020600020905b81548152906001019060200180831161158457829003601f168201915b505050505081526020016001820160009054906101000a900460ff1660048111156115cf576115ce612887565b5b60048111156115e1576115e0612887565b5b81526020016001820160019054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160028201548152602001600382015481526020016004820154815250509050919050565b611668611d70565b73ffffffffffffffffffffffffffffffffffffffff1661168661121b565b73ffffffffffffffffffffffffffffffffffffffff16146116dc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016116d3906131e6565b60405180910390fd5b6116e660036122ad565b60006116f260036122c3565b90508160046000838152602001908152602001600020600082015181600001908051906020019061172492919061232f565b5060208201518160010160006101000a81548160ff021916908360048111156117505761174f612887565b5b021790555060408201518160010160016101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550606082015181600201556080820151816003015560a082015181600401559050505050565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611851576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161184890613331565b60405180910390fd5b8060046000848152602001908152602001600020600301600082825403925050819055505050565b60016020528160005260406000206020528060005260406000206000915091509054906101000a900460ff1681565b60006118b460036122c3565b905090565b8473ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614806119795750600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b6119b8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119af9061346a565b60405180910390fd5b816000808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008581526020019081526020016000206000828254611a1791906134e8565b92505081905550816000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008581526020019081526020016000206000828254611a7d919061351c565b925050819055508373ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f628686604051611afa929190613714565b60405180910390a460008473ffffffffffffffffffffffffffffffffffffffff163b14611c005763f23a6e6160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168473ffffffffffffffffffffffffffffffffffffffff1663f23a6e6133888787876040518663ffffffff1660e01b8152600401611b8995949392919061373d565b602060405180830381600087803b158015611ba357600080fd5b505af1158015611bb7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611bdb919061367b565b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614611c32565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff1614155b611c71576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611c68906136f4565b60405180910390fd5b5050505050565b611c80611d70565b73ffffffffffffffffffffffffffffffffffffffff16611c9e61121b565b73ffffffffffffffffffffffffffffffffffffffff1614611cf4576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611ceb906131e6565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415611d64576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611d5b90613809565b60405180910390fd5b611d6d81611ef7565b50565b600033905090565b60008251905081518114611dc1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611db8906133fe565b60405180910390fd5b60005b81811015611e7157828181518110611ddf57611dde61348a565b5b60200260200101516000808773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000868481518110611e3a57611e3961348a565b5b602002602001015181526020019081526020016000206000828254611e5f91906134e8565b92505081905550806001019050611dc4565b50600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8686604051611ee9929190613572565b60405180910390a450505050565b6000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b60008351905082518114612006576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611ffd906133fe565b60405180910390fd5b60005b818110156120b6578381815181106120245761202361348a565b5b60200260200101516000808873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600087848151811061207f5761207e61348a565b5b6020026020010151815260200190815260200160002060008282546120a4919061351c565b92505081905550806001019050612009565b508473ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb878760405161212e929190613572565b60405180910390a460008573ffffffffffffffffffffffffffffffffffffffff163b146122355763bc197c8160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168573ffffffffffffffffffffffffffffffffffffffff1663bc197c813360008888886040518663ffffffff1660e01b81526004016121be9594939291906135fe565b602060405180830381600087803b1580156121d857600080fd5b505af11580156121ec573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612210919061367b565b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614612267565b600073ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1614155b6122a6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161229d906136f4565b60405180910390fd5b5050505050565b6001816000016000828254019250508190555050565b600081600001549050919050565b6040518060c0016040528060608152602001600060048111156122f7576122f6612887565b5b8152602001600073ffffffffffffffffffffffffffffffffffffffff1681526020016000815260200160008152602001600081525090565b82805461233b90613380565b90600052602060002090601f01602090048101928261235d57600085556123a4565b82601f1061237657805160ff19168380011785556123a4565b828001600101855582156123a4579182015b828111156123a3578251825591602001919060010190612388565b5b5090506123b191906123b5565b5090565b5b808211156123ce5760008160009055506001016123b6565b5090565b6000604051905090565b600080fd5b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000612411826123e6565b9050919050565b61242181612406565b811461242c57600080fd5b50565b60008135905061243e81612418565b92915050565b6000819050919050565b61245781612444565b811461246257600080fd5b50565b6000813590506124748161244e565b92915050565b60008060408385031215612491576124906123dc565b5b600061249f8582860161242f565b92505060206124b085828601612465565b9150509250929050565b6124c381612444565b82525050565b60006020820190506124de60008301846124ba565b92915050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b612519816124e4565b811461252457600080fd5b50565b60008135905061253681612510565b92915050565b600060208284031215612552576125516123dc565b5b600061256084828501612527565b91505092915050565b60008115159050919050565b61257e81612569565b82525050565b60006020820190506125996000830184612575565b92915050565b6000602082840312156125b5576125b46123dc565b5b60006125c38482850161242f565b91505092915050565b6000602082840312156125e2576125e16123dc565b5b60006125f084828501612465565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015612633578082015181840152602081019050612618565b83811115612642576000848401525b50505050565b6000601f19601f8301169050919050565b6000612664826125f9565b61266e8185612604565b935061267e818560208601612615565b61268781612648565b840191505092915050565b600060208201905081810360008301526126ac8184612659565b905092915050565b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6126f182612648565b810181811067ffffffffffffffff821117156127105761270f6126b9565b5b80604052505050565b60006127236123d2565b905061272f82826126e8565b919050565b600067ffffffffffffffff82111561274f5761274e6126b9565b5b602082029050602081019050919050565b600080fd5b600061277861277384612734565b612719565b9050808382526020820190506020840283018581111561279b5761279a612760565b5b835b818110156127c457806127b08882612465565b84526020840193505060208101905061279d565b5050509392505050565b600082601f8301126127e3576127e26126b4565b5b81356127f3848260208601612765565b91505092915050565b600080600060608486031215612815576128146123dc565b5b60006128238682870161242f565b935050602084013567ffffffffffffffff811115612844576128436123e1565b5b612850868287016127ce565b925050604084013567ffffffffffffffff811115612871576128706123e1565b5b61287d868287016127ce565b9150509250925092565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600581106128c7576128c6612887565b5b50565b60008190506128d8826128b6565b919050565b60006128e8826128ca565b9050919050565b6128f8816128dd565b82525050565b61290781612406565b82525050565b600060c08201905081810360008301526129278189612659565b905061293660208301886128ef565b61294360408301876128fe565b61295060608301866124ba565b61295d60808301856124ba565b61296a60a08301846124ba565b979650505050505050565b600080fd5b600067ffffffffffffffff821115612995576129946126b9565b5b61299e82612648565b9050602081019050919050565b82818337600083830152505050565b60006129cd6129c88461297a565b612719565b9050828152602081018484840111156129e9576129e8612975565b5b6129f48482856129ab565b509392505050565b600082601f830112612a1157612a106126b4565b5b8135612a218482602086016129ba565b91505092915050565b600080600080600060a08688031215612a4657612a456123dc565b5b6000612a548882890161242f565b9550506020612a658882890161242f565b945050604086013567ffffffffffffffff811115612a8657612a856123e1565b5b612a92888289016127ce565b935050606086013567ffffffffffffffff811115612ab357612ab26123e1565b5b612abf888289016127ce565b925050608086013567ffffffffffffffff811115612ae057612adf6123e1565b5b612aec888289016129fc565b9150509295509295909350565b60008060408385031215612b1057612b0f6123dc565b5b6000612b1e85828601612465565b9250506020612b2f85828601612465565b9150509250929050565b600067ffffffffffffffff821115612b5457612b536126b9565b5b602082029050602081019050919050565b6000612b78612b7384612b39565b612719565b90508083825260208201905060208402830185811115612b9b57612b9a612760565b5b835b81811015612bc45780612bb0888261242f565b845260208401935050602081019050612b9d565b5050509392505050565b600082601f830112612be357612be26126b4565b5b8135612bf3848260208601612b65565b91505092915050565b60008060408385031215612c1357612c126123dc565b5b600083013567ffffffffffffffff811115612c3157612c306123e1565b5b612c3d85828601612bce565b925050602083013567ffffffffffffffff811115612c5e57612c5d6123e1565b5b612c6a858286016127ce565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b612ca981612444565b82525050565b6000612cbb8383612ca0565b60208301905092915050565b6000602082019050919050565b6000612cdf82612c74565b612ce98185612c7f565b9350612cf483612c90565b8060005b83811015612d25578151612d0c8882612caf565b9750612d1783612cc7565b925050600181019050612cf8565b5085935050505092915050565b60006020820190508181036000830152612d4c8184612cd4565b905092915050565b6000602082019050612d6960008301846128fe565b92915050565b612d7881612569565b8114612d8357600080fd5b50565b600081359050612d9581612d6f565b92915050565b60008060408385031215612db257612db16123dc565b5b6000612dc08582860161242f565b9250506020612dd185828601612d86565b9150509250929050565b600082825260208201905092915050565b6000612df7826125f9565b612e018185612ddb565b9350612e11818560208601612615565b612e1a81612648565b840191505092915050565b612e2e816128dd565b82525050565b612e3d81612406565b82525050565b600060c0830160008301518482036000860152612e608282612dec565b9150506020830151612e756020860182612e25565b506040830151612e886040860182612e34565b506060830151612e9b6060860182612ca0565b506080830151612eae6080860182612ca0565b5060a0830151612ec160a0860182612ca0565b508091505092915050565b60006020820190508181036000830152612ee68184612e43565b905092915050565b600080fd5b600080fd5b600067ffffffffffffffff821115612f1357612f126126b9565b5b612f1c82612648565b9050602081019050919050565b6000612f3c612f3784612ef8565b612719565b905082815260208101848484011115612f5857612f57612975565b5b612f638482856129ab565b509392505050565b600082601f830112612f8057612f7f6126b4565b5b8135612f90848260208601612f29565b91505092915050565b60058110612fa657600080fd5b50565b600081359050612fb881612f99565b92915050565b600060c08284031215612fd457612fd3612eee565b5b612fde60c0612719565b9050600082013567ffffffffffffffff811115612ffe57612ffd612ef3565b5b61300a84828501612f6b565b600083015250602061301e84828501612fa9565b60208301525060406130328482850161242f565b604083015250606061304684828501612465565b606083015250608061305a84828501612465565b60808301525060a061306e84828501612465565b60a08301525092915050565b6000602082840312156130905761308f6123dc565b5b600082013567ffffffffffffffff8111156130ae576130ad6123e1565b5b6130ba84828501612fbe565b91505092915050565b600080604083850312156130da576130d96123dc565b5b60006130e88582860161242f565b92505060206130f98582860161242f565b9150509250929050565b600080600080600060a0868803121561311f5761311e6123dc565b5b600061312d8882890161242f565b955050602061313e8882890161242f565b945050604061314f88828901612465565b935050606061316088828901612465565b925050608086013567ffffffffffffffff811115613181576131806123e1565b5b61318d888289016129fc565b9150509295509295909350565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b60006131d0602083612604565b91506131db8261319a565b602082019050919050565b600060208201905081810360008301526131ff816131c3565b9050919050565b600061321961321484612ef8565b612719565b90508281526020810184848401111561323557613234612975565b5b613240848285612615565b509392505050565b600082601f83011261325d5761325c6126b4565b5b815161326d848260208601613206565b91505092915050565b60006020828403121561328c5761328b6123dc565b5b600082015167ffffffffffffffff8111156132aa576132a96123e1565b5b6132b684828501613248565b91505092915050565b7f4f6e6c79207468652070697a7a612073686f702063616e2063616c6c2074686960008201527f73206d6574686f642e0000000000000000000000000000000000000000000000602082015250565b600061331b602983612604565b9150613326826132bf565b604082019050919050565b6000602082019050818103600083015261334a8161330e565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061339857607f821691505b602082108114156133ac576133ab613351565b5b50919050565b7f4c454e4754485f4d49534d415443480000000000000000000000000000000000600082015250565b60006133e8600f83612604565b91506133f3826133b2565b602082019050919050565b60006020820190508181036000830152613417816133db565b9050919050565b7f4e4f545f415554484f52495a4544000000000000000000000000000000000000600082015250565b6000613454600e83612604565b915061345f8261341e565b602082019050919050565b6000602082019050818103600083015261348381613447565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006134f382612444565b91506134fe83612444565b925082821015613511576135106134b9565b5b828203905092915050565b600061352782612444565b915061353283612444565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115613567576135666134b9565b5b828201905092915050565b6000604082019050818103600083015261358c8185612cd4565b905081810360208301526135a08184612cd4565b90509392505050565b600081519050919050565b600082825260208201905092915050565b60006135d0826135a9565b6135da81856135b4565b93506135ea818560208601612615565b6135f381612648565b840191505092915050565b600060a08201905061361360008301886128fe565b61362060208301876128fe565b81810360408301526136328186612cd4565b905081810360608301526136468185612cd4565b9050818103608083015261365a81846135c5565b90509695505050505050565b60008151905061367581612510565b92915050565b600060208284031215613691576136906123dc565b5b600061369f84828501613666565b91505092915050565b7f554e534146455f524543495049454e5400000000000000000000000000000000600082015250565b60006136de601083612604565b91506136e9826136a8565b602082019050919050565b6000602082019050818103600083015261370d816136d1565b9050919050565b600060408201905061372960008301856124ba565b61373660208301846124ba565b9392505050565b600060a08201905061375260008301886128fe565b61375f60208301876128fe565b61376c60408301866124ba565b61377960608301856124ba565b818103608083015261378b81846135c5565b90509695505050505050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b60006137f3602683612604565b91506137fe82613797565b604082019050919050565b60006020820190508181036000830152613822816137e6565b905091905056fea26469706673582212203d182d0ff53c7e4e84dc8974a95afcdfe3b38469fdc56a92c5394b3145bdbce964736f6c63430008090033";
var isSuperArgs = function (xs) { return xs.length > 1; };
var LazlosIngredients__factory = (function (_super) {
    __extends(LazlosIngredients__factory, _super);
    function LazlosIngredients__factory() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = this;
        if (isSuperArgs(args)) {
            _this = _super.apply(this, args) || this;
        }
        else {
            _this = _super.call(this, _abi, _bytecode, args[0]) || this;
        }
        return _this;
    }
    LazlosIngredients__factory.prototype.deploy = function (overrides) {
        return _super.prototype.deploy.call(this, overrides || {});
    };
    LazlosIngredients__factory.prototype.getDeployTransaction = function (overrides) {
        return _super.prototype.getDeployTransaction.call(this, overrides || {});
    };
    LazlosIngredients__factory.prototype.attach = function (address) {
        return _super.prototype.attach.call(this, address);
    };
    LazlosIngredients__factory.prototype.connect = function (signer) {
        return _super.prototype.connect.call(this, signer);
    };
    LazlosIngredients__factory.createInterface = function () {
        return new ethers_1.utils.Interface(_abi);
    };
    LazlosIngredients__factory.connect = function (address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    };
    LazlosIngredients__factory.bytecode = _bytecode;
    LazlosIngredients__factory.abi = _abi;
    return LazlosIngredients__factory;
}(ethers_1.ContractFactory));
exports.LazlosIngredients__factory = LazlosIngredients__factory;
