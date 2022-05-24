"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
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
exports.LazlosPizzas__factory = void 0;
var ethers_1 = require("ethers");
var _abi = [
    {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
    },
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
                name: "spender",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
        name: "Approval",
        type: "event",
    },
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
                indexed: true,
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
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
                name: "pizzaData",
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
                internalType: "address",
                name: "",
                type: "address",
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
                name: "",
                type: "uint256",
            },
        ],
        name: "getApproved",
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
        inputs: [],
        name: "name",
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
        inputs: [],
        name: "numPizzas",
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
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "ownerOf",
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
                name: "pizzaData",
                type: "tuple",
            },
        ],
        name: "rebake",
        outputs: [],
        stateMutability: "nonpayable",
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
                internalType: "uint256",
                name: "id",
                type: "uint256",
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
        inputs: [],
        name: "symbol",
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
        name: "tokenURI",
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
        ],
        name: "transferFrom",
        outputs: [],
        stateMutability: "nonpayable",
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
];
var _bytecode = "0x60806040523480156200001157600080fd5b506040518060400160405280600d81526020017f4c617a6c6f27732050697a7a61000000000000000000000000000000000000008152506040518060400160405280600581526020017f4c415a4c4f000000000000000000000000000000000000000000000000000000815250816000908051906020019062000096929190620001a6565b508060019080519060200190620000af929190620001a6565b505050620000d2620000c6620000d860201b60201c565b620000e060201b60201c565b620002bb565b600033905090565b6000600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b828054620001b49062000285565b90600052602060002090601f016020900481019282620001d8576000855562000224565b82601f10620001f357805160ff191683800117855562000224565b8280016001018555821562000224579182015b828111156200022357825182559160200191906001019062000206565b5b50905062000233919062000237565b5090565b5b808211156200025257600081600090555060010162000238565b5090565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200029e57607f821691505b60208210811415620002b557620002b462000256565b5b50919050565b6133a280620002cb6000396000f3fe608060405234801561001057600080fd5b50600436106101735760003560e01c806370a08231116100de578063b88d4fde11610097578063e985e9c511610071578063e985e9c514610436578063ea131c2814610466578063f2fde38b14610496578063fd9f8005146104b257610173565b8063b88d4fde146103cc578063c074f412146103e8578063c87b56dd1461040657610173565b806370a082311461031c578063715018a61461034c578063795c0a4b146103565780638da5cb5b1461037457806395d89b4114610392578063a22cb465146103b057610173565b806312b40a9f1161013057806312b40a9f1461025e57806323b872dd1461027a5780634103693c1461029657806342842e0e146102b457806342966c68146102d05780636352211e146102ec57610173565b806301ffc9a7146101785780630452d8ed146101a857806306fdde03146101c4578063081812fc146101e2578063095ea7b3146102125780630aa71aa01461022e575b600080fd5b610192600480360381019061018d91906122cb565b6104ce565b60405161019f9190612313565b60405180910390f35b6101c260048036038101906101bd919061238c565b610560565b005b6101cc610620565b6040516101d99190612452565b60405180910390f35b6101fc60048036038101906101f791906124aa565b6106ae565b60405161020991906124e6565b60405180910390f35b61022c60048036038101906102279190612501565b6106e1565b005b610248600480360381019061024391906124aa565b6108ca565b60405161025591906126e8565b60405180910390f35b6102786004803603810190610273919061238c565b610a7e565b005b610294600480360381019061028f9190612704565b610b3e565b005b61029e610f3e565b6040516102ab9190612766565b60405180910390f35b6102ce60048036038101906102c99190612704565b610f4a565b005b6102ea60048036038101906102e591906124aa565b611091565b005b610306600480360381019061030191906124aa565b61112d565b60405161031391906124e6565b60405180910390f35b6103366004803603810190610331919061238c565b611160565b6040516103439190612766565b60405180910390f35b610354611178565b005b61035e611200565b60405161036b91906124e6565b60405180910390f35b61037c611226565b60405161038991906124e6565b60405180910390f35b61039a611250565b6040516103a79190612452565b60405180910390f35b6103ca60048036038101906103c591906127ad565b6112de565b005b6103e660048036038101906103e19190612852565b6113db565b005b6103f0611528565b6040516103fd91906124e6565b60405180910390f35b610420600480360381019061041b91906124aa565b61154e565b60405161042d9190612452565b60405180910390f35b610450600480360381019061044b91906128da565b611607565b60405161045d9190612313565b60405180910390f35b610480600480360381019061047b9190612bb6565b611636565b60405161048d9190612766565b60405180910390f35b6104b060048036038101906104ab919061238c565b611799565b005b6104cc60048036038101906104c79190612bf7565b611891565b005b60006301ffc9a760e01b827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061052957506380ac58cd60e01b827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b806105595750635b5e139f60e01b827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b9050919050565b610568611a6c565b73ffffffffffffffffffffffffffffffffffffffff16610586611226565b73ffffffffffffffffffffffffffffffffffffffff16146105dc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105d390612c97565b60405180910390fd5b80600760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6000805461062d90612ce6565b80601f016020809104026020016040519081016040528092919081815260200182805461065990612ce6565b80156106a65780601f1061067b576101008083540402835291602001916106a6565b820191906000526020600020905b81548152906001019060200180831161068957829003601f168201915b505050505081565b60046020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60006003600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614806107d95750600560008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b610818576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161080f90612d64565b60405180910390fd5b826004600084815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550818373ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a4505050565b6108d261207b565b600a60008381526020019081526020016000206040518060a00160405290816000820160009054906101000a900461ffff1661ffff1661ffff1681526020016000820160029054906101000a900461ffff1661ffff1661ffff16815260200160018201600380602002604051908101604052809291908260038015610994576020028201916000905b82829054906101000a900461ffff1661ffff168152602001906002019060208260010104928301926001038202915080841161095b5790505b5050505050815260200160028201600480602002604051908101604052809291908260048015610a01576020028201916000905b82829054906101000a900461ffff1661ffff16815260200190600201906020826001010492830192600103820291508084116109c85790505b5050505050815260200160038201600480602002604051908101604052809291908260048015610a6e576020028201916000905b82829054906101000a900461ffff1661ffff1681526020019060020190602082600101049283019260010382029150808411610a355790505b5050505050815250509050919050565b610a86611a6c565b73ffffffffffffffffffffffffffffffffffffffff16610aa4611226565b73ffffffffffffffffffffffffffffffffffffffff1614610afa576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610af190612c97565b60405180910390fd5b80600860006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b6003600082815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614610bdf576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bd690612dd0565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610c4f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c4690612e3c565b60405180910390fd5b8273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161480610d0f5750600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff165b80610d7857506004600082815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b610db7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610dae90612d64565b60405180910390fd5b600260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000815480929190600190039190505550600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008154809291906001019190505550816003600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506004600082815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055808273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a4505050565b60098060000154905081565b610f55838383610b3e565b60008273ffffffffffffffffffffffffffffffffffffffff163b148061104d575063150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168273ffffffffffffffffffffffffffffffffffffffff1663150b7a023386856040518463ffffffff1660e01b8152600401610fda93929190612e93565b602060405180830381600087803b158015610ff457600080fd5b505af1158015611008573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061102c9190612ef2565b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b61108c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161108390612f6b565b60405180910390fd5b505050565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611121576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161111890612ffd565b60405180910390fd5b61112a81611a74565b50565b60036020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60026020528060005260406000206000915090505481565b611180611a6c565b73ffffffffffffffffffffffffffffffffffffffff1661119e611226565b73ffffffffffffffffffffffffffffffffffffffff16146111f4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111eb90612c97565b60405180910390fd5b6111fe6000611c38565b565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6001805461125d90612ce6565b80601f016020809104026020016040519081016040528092919081815260200182805461128990612ce6565b80156112d65780601f106112ab576101008083540402835291602001916112d6565b820191906000526020600020905b8154815290600101906020018083116112b957829003601f168201915b505050505081565b80600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31836040516113cf9190612313565b60405180910390a35050565b6113e6858585610b3e565b60008473ffffffffffffffffffffffffffffffffffffffff163b14806114e2575063150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168473ffffffffffffffffffffffffffffffffffffffff1663150b7a0233888787876040518663ffffffff1660e01b815260040161146f959493929190613059565b602060405180830381600087803b15801561148957600080fd5b505af115801561149d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114c19190612ef2565b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b611521576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161151890612f6b565b60405180910390fd5b5050505050565b600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6060600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630976d625836040518263ffffffff1660e01b81526004016115ab9190612766565b60006040518083038186803b1580156115c357600080fd5b505afa1580156115d7573d6000803e3d6000fd5b505050506040513d6000823e3d601f19601f82011682018060405250810190611600919061314d565b9050919050565b60056020528160005260406000206020528060005260406000206000915091509054906101000a900460ff1681565b6000600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146116c8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016116bf90612ffd565b60405180910390fd5b6116d26009611cfe565b60006116de6009611d14565b905082600a600083815260200190815260200160002060008201518160000160006101000a81548161ffff021916908361ffff16021790555060208201518160000160026101000a81548161ffff021916908361ffff1602179055506040820151816001019060036117519291906120c4565b50606082015181600201906004611769929190612161565b50608082015181600301906004611781929190612161565b5090505061178f8482611d22565b8091505092915050565b6117a1611a6c565b73ffffffffffffffffffffffffffffffffffffffff166117bf611226565b73ffffffffffffffffffffffffffffffffffffffff1614611815576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161180c90612c97565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415611885576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161187c90613208565b60405180910390fd5b61188e81611c38565b50565b600760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611921576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161191890612ffd565b60405180910390fd5b6003600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16146119c2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016119b990613274565b60405180910390fd5b80600a600084815260200190815260200160002060008201518160000160006101000a81548161ffff021916908361ffff16021790555060208201518160000160026101000a81548161ffff021916908361ffff160217905550604082015181600101906003611a339291906120c4565b50606082015181600201906004611a4b929190612161565b50608082015181600301906004611a63929190612161565b50905050505050565b600033905090565b60006003600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415611b1c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611b13906132e0565b60405180910390fd5b600260008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008154809291906001900391905055506003600083815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556004600083815260200190815260200160002060006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905581600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a45050565b6000600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6001816000016000828254019250508190555050565b600081600001549050919050565b611d2c8282611e68565b60008273ffffffffffffffffffffffffffffffffffffffff163b1480611e25575063150b7a0260e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168273ffffffffffffffffffffffffffffffffffffffff1663150b7a02336000856040518463ffffffff1660e01b8152600401611db293929190612e93565b602060405180830381600087803b158015611dcc57600080fd5b505af1158015611de0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611e049190612ef2565b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b611e64576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611e5b90612f6b565b60405180910390fd5b5050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611ed8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611ecf90612e3c565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff166003600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614611f7a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611f719061334c565b60405180910390fd5b600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008154809291906001019190505550816003600083815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550808273ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60405160405180910390a45050565b6040518060a00160405280600061ffff168152602001600061ffff1681526020016120a46121fe565b81526020016120b1612220565b81526020016120be612220565b81525090565b826003600f016010900481019282156121505791602002820160005b8382111561212057835183826101000a81548161ffff021916908361ffff16021790555092602001926002016020816001010492830192600103026120e0565b801561214e5782816101000a81549061ffff0219169055600201602081600101049283019260010302612120565b505b50905061215d9190612242565b5090565b826004600f016010900481019282156121ed5791602002820160005b838211156121bd57835183826101000a81548161ffff021916908361ffff160217905550926020019260020160208160010104928301926001030261217d565b80156121eb5782816101000a81549061ffff02191690556002016020816001010492830192600103026121bd565b505b5090506121fa9190612242565b5090565b6040518060600160405280600390602082028036833780820191505090505090565b6040518060800160405280600490602082028036833780820191505090505090565b5b8082111561225b576000816000905550600101612243565b5090565b6000604051905090565b600080fd5b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b6122a881612273565b81146122b357600080fd5b50565b6000813590506122c58161229f565b92915050565b6000602082840312156122e1576122e0612269565b5b60006122ef848285016122b6565b91505092915050565b60008115159050919050565b61230d816122f8565b82525050565b60006020820190506123286000830184612304565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006123598261232e565b9050919050565b6123698161234e565b811461237457600080fd5b50565b60008135905061238681612360565b92915050565b6000602082840312156123a2576123a1612269565b5b60006123b084828501612377565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156123f35780820151818401526020810190506123d8565b83811115612402576000848401525b50505050565b6000601f19601f8301169050919050565b6000612424826123b9565b61242e81856123c4565b935061243e8185602086016123d5565b61244781612408565b840191505092915050565b6000602082019050818103600083015261246c8184612419565b905092915050565b6000819050919050565b61248781612474565b811461249257600080fd5b50565b6000813590506124a48161247e565b92915050565b6000602082840312156124c0576124bf612269565b5b60006124ce84828501612495565b91505092915050565b6124e08161234e565b82525050565b60006020820190506124fb60008301846124d7565b92915050565b6000806040838503121561251857612517612269565b5b600061252685828601612377565b925050602061253785828601612495565b9150509250929050565b600061ffff82169050919050565b61255881612541565b82525050565b600060039050919050565b600081905092915050565b6000819050919050565b600061258a838361254f565b60208301905092915050565b6000602082019050919050565b6125ac8161255e565b6125b68184612569565b92506125c182612574565b8060005b838110156125f25781516125d9878261257e565b96506125e483612596565b9250506001810190506125c5565b505050505050565b600060049050919050565b600081905092915050565b6000819050919050565b6000602082019050919050565b612630816125fa565b61263a8184612605565b925061264582612610565b8060005b8381101561267657815161265d878261257e565b96506126688361261a565b925050600181019050612649565b505050505050565b6101a082016000820151612695600085018261254f565b5060208201516126a8602085018261254f565b5060408201516126bb60408501826125a3565b5060608201516126ce60a0850182612627565b5060808201516126e2610120850182612627565b50505050565b60006101a0820190506126fe600083018461267e565b92915050565b60008060006060848603121561271d5761271c612269565b5b600061272b86828701612377565b935050602061273c86828701612377565b925050604061274d86828701612495565b9150509250925092565b61276081612474565b82525050565b600060208201905061277b6000830184612757565b92915050565b61278a816122f8565b811461279557600080fd5b50565b6000813590506127a781612781565b92915050565b600080604083850312156127c4576127c3612269565b5b60006127d285828601612377565b92505060206127e385828601612798565b9150509250929050565b600080fd5b600080fd5b600080fd5b60008083601f840112612812576128116127ed565b5b8235905067ffffffffffffffff81111561282f5761282e6127f2565b5b60208301915083600182028301111561284b5761284a6127f7565b5b9250929050565b60008060008060006080868803121561286e5761286d612269565b5b600061287c88828901612377565b955050602061288d88828901612377565b945050604061289e88828901612495565b935050606086013567ffffffffffffffff8111156128bf576128be61226e565b5b6128cb888289016127fc565b92509250509295509295909350565b600080604083850312156128f1576128f0612269565b5b60006128ff85828601612377565b925050602061291085828601612377565b9150509250929050565b600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61295782612408565b810181811067ffffffffffffffff821117156129765761297561291f565b5b80604052505050565b600061298961225f565b9050612995828261294e565b919050565b6129a381612541565b81146129ae57600080fd5b50565b6000813590506129c08161299a565b92915050565b600067ffffffffffffffff8211156129e1576129e061291f565b5b602082029050919050565b60006129ff6129fa846129c6565b61297f565b90508060208402830185811115612a1957612a186127f7565b5b835b81811015612a425780612a2e88826129b1565b845260208401935050602081019050612a1b565b5050509392505050565b600082601f830112612a6157612a606127ed565b5b6003612a6e8482856129ec565b91505092915050565b600067ffffffffffffffff821115612a9257612a9161291f565b5b602082029050919050565b6000612ab0612aab84612a77565b61297f565b90508060208402830185811115612aca57612ac96127f7565b5b835b81811015612af35780612adf88826129b1565b845260208401935050602081019050612acc565b5050509392505050565b600082601f830112612b1257612b116127ed565b5b6004612b1f848285612a9d565b91505092915050565b60006101a08284031215612b3f57612b3e61291a565b5b612b4960a061297f565b90506000612b59848285016129b1565b6000830152506020612b6d848285016129b1565b6020830152506040612b8184828501612a4c565b60408301525060a0612b9584828501612afd565b606083015250610120612baa84828501612afd565b60808301525092915050565b6000806101c08385031215612bce57612bcd612269565b5b6000612bdc85828601612377565b9250506020612bed85828601612b28565b9150509250929050565b60008060006101e08486031215612c1157612c10612269565b5b6000612c1f86828701612377565b9350506020612c3086828701612495565b9250506040612c4186828701612b28565b9150509250925092565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000612c816020836123c4565b9150612c8c82612c4b565b602082019050919050565b60006020820190508181036000830152612cb081612c74565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680612cfe57607f821691505b60208210811415612d1257612d11612cb7565b5b50919050565b7f4e4f545f415554484f52495a4544000000000000000000000000000000000000600082015250565b6000612d4e600e836123c4565b9150612d5982612d18565b602082019050919050565b60006020820190508181036000830152612d7d81612d41565b9050919050565b7f57524f4e475f46524f4d00000000000000000000000000000000000000000000600082015250565b6000612dba600a836123c4565b9150612dc582612d84565b602082019050919050565b60006020820190508181036000830152612de981612dad565b9050919050565b7f494e56414c49445f524543495049454e54000000000000000000000000000000600082015250565b6000612e266011836123c4565b9150612e3182612df0565b602082019050919050565b60006020820190508181036000830152612e5581612e19565b9050919050565b600082825260208201905092915050565b50565b6000612e7d600083612e5c565b9150612e8882612e6d565b600082019050919050565b6000608082019050612ea860008301866124d7565b612eb560208301856124d7565b612ec26040830184612757565b8181036060830152612ed381612e70565b9050949350505050565b600081519050612eec8161229f565b92915050565b600060208284031215612f0857612f07612269565b5b6000612f1684828501612edd565b91505092915050565b7f554e534146455f524543495049454e5400000000000000000000000000000000600082015250565b6000612f556010836123c4565b9150612f6082612f1f565b602082019050919050565b60006020820190508181036000830152612f8481612f48565b9050919050565b7f4f6e6c79207468652070697a7a612073686f702063616e2063616c6c2074686960008201527f73206d6574686f642e0000000000000000000000000000000000000000000000602082015250565b6000612fe76029836123c4565b9150612ff282612f8b565b604082019050919050565b6000602082019050818103600083015261301681612fda565b9050919050565b82818337600083830152505050565b60006130388385612e5c565b935061304583858461301d565b61304e83612408565b840190509392505050565b600060808201905061306e60008301886124d7565b61307b60208301876124d7565b6130886040830186612757565b818103606083015261309b81848661302c565b90509695505050505050565b600080fd5b600067ffffffffffffffff8211156130c7576130c661291f565b5b6130d082612408565b9050602081019050919050565b60006130f06130eb846130ac565b61297f565b90508281526020810184848401111561310c5761310b6130a7565b5b6131178482856123d5565b509392505050565b600082601f830112613134576131336127ed565b5b81516131448482602086016130dd565b91505092915050565b60006020828403121561316357613162612269565b5b600082015167ffffffffffffffff8111156131815761318061226e565b5b61318d8482850161311f565b91505092915050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b60006131f26026836123c4565b91506131fd82613196565b604082019050919050565b60006020820190508181036000830152613221816131e5565b9050919050565b7f42616b657220646f65736e2774206f776e20746869732070697a7a612e000000600082015250565b600061325e601d836123c4565b915061326982613228565b602082019050919050565b6000602082019050818103600083015261328d81613251565b9050919050565b7f4e4f545f4d494e54454400000000000000000000000000000000000000000000600082015250565b60006132ca600a836123c4565b91506132d582613294565b602082019050919050565b600060208201905081810360008301526132f9816132bd565b9050919050565b7f414c52454144595f4d494e544544000000000000000000000000000000000000600082015250565b6000613336600e836123c4565b915061334182613300565b602082019050919050565b6000602082019050818103600083015261336581613329565b905091905056fea2646970667358221220c8d608b79cd2cc8e02b88efffda6d31a76581c0a84dbd7d3962bbdbcbe40f99564736f6c63430008090033";
var isSuperArgs = function (xs) { return xs.length > 1; };
var LazlosPizzas__factory = (function (_super) {
    __extends(LazlosPizzas__factory, _super);
    function LazlosPizzas__factory() {
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
    LazlosPizzas__factory.prototype.deploy = function (overrides) {
        return _super.prototype.deploy.call(this, overrides || {});
    };
    LazlosPizzas__factory.prototype.getDeployTransaction = function (overrides) {
        return _super.prototype.getDeployTransaction.call(this, overrides || {});
    };
    LazlosPizzas__factory.prototype.attach = function (address) {
        return _super.prototype.attach.call(this, address);
    };
    LazlosPizzas__factory.prototype.connect = function (signer) {
        return _super.prototype.connect.call(this, signer);
    };
    LazlosPizzas__factory.createInterface = function () {
        return new ethers_1.utils.Interface(_abi);
    };
    LazlosPizzas__factory.connect = function (address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    };
    LazlosPizzas__factory.bytecode = _bytecode;
    LazlosPizzas__factory.abi = _abi;
    return LazlosPizzas__factory;
}(ethers_1.ContractFactory));
exports.LazlosPizzas__factory = LazlosPizzas__factory;
