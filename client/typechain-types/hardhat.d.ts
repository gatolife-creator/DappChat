/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "Chat",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Chat__factory>;
    getContractFactory(
      name: "TippingSystem",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TippingSystem__factory>;

    getContractAt(
      name: "Chat",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Chat>;
    getContractAt(
      name: "TippingSystem",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TippingSystem>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}