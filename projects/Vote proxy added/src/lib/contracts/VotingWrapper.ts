import Web3 from 'web3';
import * as VotingJSON from '../../../build/contracts/Voting.json';
import { Voting } from '../../types/Voting';
let args = ['Sasha', 'Petr', 'Masha'];

const DEFAULT_SEND_OPTIONS = {
    gas: 9000000
};

export class VotingWrapper {
    web3: Web3;
    anothercontract: Voting;

    contract: Voting;

    address: string;

    constructor(web3: Web3) {
        this.web3 = web3;
        this.contract = new web3.eth.Contract(VotingJSON.abi as any) as any;
    }

    get isDeployed() {
        return Boolean(this.address);
    }

    async getTotalVotesFor(candidates: string, fromAddress: string) {
        const data = await this.contract.methods.totalVotesFor(this.web3.utils.asciiToHex(candidates)).call({ from: fromAddress });

        return parseInt(data, 10);
    }

    async voteForCandidate(candidate: string, fromAddress: string) {
        const tx = await this.contract.methods.voteForCandidate(this.web3.utils.asciiToHex(candidate)).send({
            ...DEFAULT_SEND_OPTIONS,
            from: fromAddress
        });

        return tx;
    }

    async deploy(fromAddress: string) {
        const deployTx = await (this.contract
            .deploy({
                data: VotingJSON.bytecode,
                arguments: [args.map((arg) => this.web3.utils.asciiToHex(arg))]
            })
            .send({
                ...DEFAULT_SEND_OPTIONS,
                from: fromAddress,
                to: '0x0000000000000000000000000000000000000000'
            } as any) as any);

        this.useDeployed(deployTx.contractAddress);

        return deployTx.transactionHash;
    }

    useDeployed(contractAddress: string) {
        this.address = contractAddress;
        this.contract.options.address = contractAddress;
    }
    useproxyContract(contractAddress: string) {
        this.anothercontract.options.address = contractAddress;
    }
}
