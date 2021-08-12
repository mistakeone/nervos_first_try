import Web3 from 'web3';
import * as SudtERC20ProxyJSON from '../../../build/contracts/SudtERC20Proxy.json';
import {   BaseContract } from "../../types/types";
let args = ['Sasha', 'Petr', 'Masha'];


export class SudtERC20Wrapper {
    web3: Web3;

    contract: BaseContract;

    address: string;

    constructor(web3: Web3) {
        this.web3 = web3;
        this.contract = new web3.eth.Contract(SudtERC20ProxyJSON.abi as any) as any;
    }

    get isDeployed() {
        return Boolean(this.address);
    }

    async getSUDTBalance(polyjuiceAddress: string, fromAddress: string) {
        const data = await this.contract.methods.balanceOf(polyjuiceAddress).call({ from: fromAddress });
        return data;
    }

    useDeployed(contractAddress: string) {
        this.address = contractAddress;
        this.contract.options.address = contractAddress;
    }
}