/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../../../common";

export type PizzaStruct = {
  base: BigNumberish;
  sauce: BigNumberish;
  cheeses: [BigNumberish, BigNumberish, BigNumberish];
  meats: [BigNumberish, BigNumberish, BigNumberish, BigNumberish];
  toppings: [BigNumberish, BigNumberish, BigNumberish, BigNumberish];
};

export type PizzaStructOutput = [
  number,
  number,
  [number, number, number],
  [number, number, number, number],
  [number, number, number, number]
] & {
  base: number;
  sauce: number;
  cheeses: [number, number, number];
  meats: [number, number, number, number];
  toppings: [number, number, number, number];
};

export interface ILazlosPizzasInterface extends utils.Interface {
  functions: {
    "bake(address,(uint16,uint16,uint16[3],uint16[4],uint16[4]))": FunctionFragment;
    "burn(uint256)": FunctionFragment;
    "pizza(uint256)": FunctionFragment;
    "rebake(address,uint256,(uint16,uint16,uint16[3],uint16[4],uint16[4]))": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "bake" | "burn" | "pizza" | "rebake"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "bake",
    values: [string, PizzaStruct]
  ): string;
  encodeFunctionData(functionFragment: "burn", values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: "pizza", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "rebake",
    values: [string, BigNumberish, PizzaStruct]
  ): string;

  decodeFunctionResult(functionFragment: "bake", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "burn", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pizza", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "rebake", data: BytesLike): Result;

  events: {};
}

export interface ILazlosPizzas extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ILazlosPizzasInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    bake(
      baker: string,
      pizza: PizzaStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    burn(
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    pizza(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[PizzaStructOutput]>;

    rebake(
      baker: string,
      pizzaTokenId: BigNumberish,
      pizza: PizzaStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  bake(
    baker: string,
    pizza: PizzaStruct,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  burn(
    tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  pizza(
    tokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<PizzaStructOutput>;

  rebake(
    baker: string,
    pizzaTokenId: BigNumberish,
    pizza: PizzaStruct,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    bake(
      baker: string,
      pizza: PizzaStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    burn(tokenId: BigNumberish, overrides?: CallOverrides): Promise<void>;

    pizza(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PizzaStructOutput>;

    rebake(
      baker: string,
      pizzaTokenId: BigNumberish,
      pizza: PizzaStruct,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    bake(
      baker: string,
      pizza: PizzaStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    burn(
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    pizza(tokenId: BigNumberish, overrides?: CallOverrides): Promise<BigNumber>;

    rebake(
      baker: string,
      pizzaTokenId: BigNumberish,
      pizza: PizzaStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    bake(
      baker: string,
      pizza: PizzaStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    burn(
      tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    pizza(
      tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    rebake(
      baker: string,
      pizzaTokenId: BigNumberish,
      pizza: PizzaStruct,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}