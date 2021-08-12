/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { ToastContainer, toast } from 'react-toastify';
import './app.scss';
import 'react-toastify/dist/ReactToastify.css';
import { PolyjuiceHttpProvider } from '@polyjuice-provider/web3';
import { AddressTranslator } from 'nervos-godwoken-integration';
import { VotingWrapper } from '../lib/contracts/VotingWrapper';
import { SudtERC20Wrapper } from '../lib/contracts/SudtERC20Wrapper';

import { CONFIG } from '../config';


// console.log(`Layer 2 Deposit Address on Layer 1: \n${depositAddress.addressString}`);
async function createWeb3() {
    // Modern dapp browsers...
    if ((window as any).ethereum) {
        const godwokenRpcUrl = CONFIG.WEB3_PROVIDER_URL;
        const providerConfig = {
            rollupTypeHash: CONFIG.ROLLUP_TYPE_HASH,
            ethAccountLockCodeHash: CONFIG.ETH_ACCOUNT_LOCK_CODE_HASH,
            web3Url: godwokenRpcUrl
        };

        const provider = new PolyjuiceHttpProvider(godwokenRpcUrl, providerConfig);
        const web3 = new Web3(provider || Web3.givenProvider);

        try {
            // Request account access if needed
            await (window as any).ethereum.enable();
        } catch (error) {
            // User denied account access...
        }

        return web3;
    }

    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    return null;
}
interface Candidate {
    name: string,
    votes: number
}

export function App() {
    const [web3, setWeb3] = useState<Web3>(null);
    const [contract, setContract] = useState<VotingWrapper>();
    const [contractSUDT, setContractSUDT] = useState<SudtERC20Wrapper>();
    const [contractCKETH, setContractCKETH] = useState<SudtERC20Wrapper>();
    const [accounts, setAccounts] = useState<string[]>();
    const [l2Balance, setL2Balance] = useState<bigint>();
    const [sudtBalance, setSUDTBalance] = useState<bigint>();
    const [ckethBalance, setCKETHBalance] = useState<bigint>();
    const [existingContractIdInputValue, setExistingContractIdInputValue] = useState<string>();
    const [candidates, setCandidates] = useState<Candidate[] | undefined>();
    const [deployTxHash, setDeployTxHash] = useState<string | undefined>();
    const [polyjuiceAddress, setPolyjuiceAddress] = useState<string | undefined>();
    const [Layer2DepositAddress, setLayer2DepositValue] = useState<string | undefined>();
    const [transactionInProgress, setTransactionInProgress] = useState(false);
    const toastId = React.useRef(null);
    const [candidateInputValue, setCandidateInputValue] = useState<
        string | undefined
    >();
    // const depositAddress = await addressTranslator.getLayer2DepositAddress(web3, '0x470D90Aac70eCf920DA205eC232fF4Cfb6FB01Be');
    
    useEffect(() => {
        if (accounts?.[0]) {
            
            const addressTranslator = new AddressTranslator();
            setPolyjuiceAddress(addressTranslator.ethAddressToGodwokenShortAddress(accounts?.[0]));
            getDepositAddress();
        } else {
            setPolyjuiceAddress(undefined);
        }
    }, [accounts?.[0]]);

    useEffect(() => {
        if (transactionInProgress && !toastId.current) {
            toastId.current = toast.info(
                'Transaction in progress. Confirm MetaMask signing dialog and please wait...',
                {
                    position: 'top-right',
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    closeButton: false
                }
            );
        } else if (!transactionInProgress && toastId.current) {
            toast.dismiss(toastId.current);
            toastId.current = null;
        }
    }, [transactionInProgress, toastId.current]);

    const account = accounts?.[0];

    async function deployContract() {
        const _contract = new VotingWrapper(web3);

        try {
            setDeployTxHash(undefined);
            setTransactionInProgress(true);

            const transactionHash = await _contract.deploy(account);

            setDeployTxHash(transactionHash);
            setExistingContractAddress(_contract.address);
            toast(
                'Successfully deployed a smart-contract. You can now proceed to get or set the value in a smart contract.',
                { type: 'success' }
            );
        } catch (error) {
            console.error(error);
            toast.error(
                'There was an error sending your transaction. Please check developer console.'
            );
        } finally {
            setTransactionInProgress(false);
        }
    }
    async function getSUDTBalance() {
        setSUDTBalance(null);
        const value = await contractSUDT.getSUDTBalance(polyjuiceAddress,account);
        setSUDTBalance(value);
    }
    async function getCKETHBalance() {
        setCKETHBalance(null);
        const value = await contractCKETH.getSUDTBalance(polyjuiceAddress,account);
        setCKETHBalance(value);
    }
    async function getL2Balance() {
        setL2Balance(null);
        const value = BigInt(await web3.eth.getBalance(account));
        setL2Balance(value);
    }
    async function getDepositAddress() {
        const addressTranslator = new AddressTranslator();
        const Layer2DepositAddressData = await addressTranslator.getLayer2DepositAddress(web3,accounts?.[0]);
        setLayer2DepositValue(Layer2DepositAddressData.addressString);
    }

    async function getTotalVotesCandidates() {
        
        let new_candidates = [];
        let contract_instance = contract;
        console.log(contract_instance);
        for (let index = 0; index < CONFIG.CANDIDATES.length; index++) {
            const element = CONFIG.CANDIDATES[index];
            let value = await contract_instance.getTotalVotesFor(element,account);
            new_candidates.push({
                name: element,
                votes: value
            }) ;
        }
        setCandidates(new_candidates);
    }

    async function setExistingContractAddress(contractAddress: string) {
        const _contract = new VotingWrapper(web3);
        _contract.useDeployed(contractAddress.trim());

        setContract(_contract);
        setCandidates(undefined);
    }
    async function copyDepositAddress(){
        navigator.clipboard.writeText(Layer2DepositAddress);
        toast(
            'Copied success.',
            { type: 'success' }
        );
    }

    async function voteForCandidate() {
        try {
            setTransactionInProgress(true);
            await contract.voteForCandidate(candidateInputValue, account);
            toast(
                'Successfully set latest stored value. You can refresh the read value now manually.',
                { type: 'success' }
            );
        } catch (error) {
            console.error(error);
            toast.error(
                'There was an error sending your transaction. Please check developer console.'
            );
        } finally {
            setTransactionInProgress(false);
            getTotalVotesCandidates();
        }
    }

    useEffect(() => {
        if (web3) {
            return;
        }

        (async () => {
            const _web3 = await createWeb3();
            setWeb3(_web3);
            const _contract = new SudtERC20Wrapper(_web3);
            _contract.useDeployed(CONFIG.SUDT_CONTRACT);
            setContractSUDT(_contract);
            const _contractCKETH = new SudtERC20Wrapper(_web3);
            _contractCKETH.useDeployed(CONFIG.CKETH_CONTRACT);
    
            setContractCKETH(_contractCKETH);
            const _accounts = [(window as any).ethereum.selectedAddress];
            setAccounts(_accounts);
            const addressTranslator = new AddressTranslator();
            const _polyjuiceAdress = addressTranslator.ethAddressToGodwokenShortAddress(_accounts[0]);
            setPolyjuiceAddress(_polyjuiceAdress);

            console.log({ _accounts });

            if (_accounts && _accounts[0]) {
                const _l2Balance = BigInt(await _web3.eth.getBalance(_accounts[0]));
                setL2Balance(_l2Balance);
                const value = await _contract.getSUDTBalance(_polyjuiceAdress,_accounts[0]);
                setSUDTBalance(value);
                const valueCKETH = await _contractCKETH.getSUDTBalance(_polyjuiceAdress,_accounts[0]);
                setCKETHBalance(valueCKETH);
            }
        })();
    });

    const LoadingIndicator = () => <span className="rotating-icon">⚙️</span>;

    return (
        <div>
            Your ETH address: <b>{accounts?.[0]}</b>
            <br />
            <br />
            Your Polyjuice address: <b>{polyjuiceAddress || ' - '}</b>
            <br />
            Layer 2 Deposit address:
            <input
            type="text" readOnly
                placeholder="Existing contract id"
                value={Layer2DepositAddress}
            />
            <button onClick={copyDepositAddress} disabled={!Layer2DepositAddress}>Copy Address</button>
            <a target="_blank" href="https://force-bridge-test.ckbapp.dev/bridge/Ethereum/Nervos?xchain-asset=0x0000000000000000000000000000000000000000">
            <button  disabled={!Layer2DepositAddress}>Deposit now!</button>
            </a>
            <small>* Please input the deposit address above in the "Recipient" input </small>
            <br />
            <br />
            <br />
            Nervos Layer 2 balance:{' '}
            <b>{l2Balance ? (l2Balance / 10n ** 8n).toString() : <LoadingIndicator />} CKB</b>
            <button onClick={getL2Balance}  disabled={!l2Balance&&!account}>Reload balance</button>
            <br />
            <br />
            <br />
            Nervos SUDT balance:{' '}
            <b>{sudtBalance ? sudtBalance : <LoadingIndicator />} SUDT</b>
            <button onClick={getSUDTBalance}   disabled={!sudtBalance&&!account}>Reload balance</button>
            <br />
            <br />
            Nervos ckETH balance:{' '}
            <b>{ckethBalance ? Number(ckethBalance)/1000000000000000000: <LoadingIndicator />} ckETH</b>
            <button onClick={getCKETHBalance}   disabled={!ckethBalance&&!account}>Reload balance</button>
            <br />
            <br />
            Deployed contract address: <b>{contract?.address || '-'}</b> <br />
            Deploy transaction hash: <b>{deployTxHash || '-'}</b>
            <br />
            <hr />
            <button onClick={deployContract} disabled={!l2Balance}>
                Deploy contract
            </button>
            &nbsp;or&nbsp;
            <input
                placeholder="Existing contract id"
                onChange={e => setExistingContractIdInputValue(e.target.value)}
            />
            <button
                disabled={!existingContractIdInputValue || !l2Balance}
                onClick={() => setExistingContractAddress(existingContractIdInputValue)}
            >
                Use existing contract
            </button>
            <br />
            <br />
            <br />
            <br />
            <h2>Vote for the best candidate!</h2>
            <h3>Click "Refresh candidates list" to get current candidates. Choose 1 to vote.</h3>
            <hr />
            
            <button onClick={getTotalVotesCandidates} disabled={!contract}>
                Refresh candidates list
            </button>
            <table className="candidate-table">
            <thead>
                <tr>
                    <th>Candidate</th>
                    <th>Total Vote</th>
                </tr>
                </thead>
                <tbody>
                {candidates ? 
                candidates.map((candidate) =>
                <tr key={candidate.name}>
                <td>{candidate.name}</td>
                    <td>{candidate.votes}</td>
                </tr>
                ): null}  
                </tbody>

            </table>

    
            <br />
            <br />

            <select onChange={e => setCandidateInputValue(e.target.value)}>
            <option selected value="Sasha">Sasha</option>
            <option  value="Petr">Petr</option>
            <option  value="Masha">Masha</option>

            </select>
            <button onClick={voteForCandidate} disabled={!contract}>
                Vote for candidate
            </button>

            
            <br />
            <br />
            <br />
            <br />
            <hr />
            The contract is deployed on Nervos Layer 2 - Godwoken + Polyjuice. After each
            transaction you might need to wait up to 120 seconds for the status to be reflected.
            <ToastContainer />
        </div>
    );
}
