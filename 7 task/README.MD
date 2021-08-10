1. ![Call](https://github.com/mistakeone/nervos_first_try/blob/master/7%20task/888881.png?raw=true "Call")

![Call](https://github.com/mistakeone/nervos_first_try/blob/master/7%20task/8888.png?raw=true "Call")
![Call](https://github.com/mistakeone/nervos_first_try/blob/master/7%20task/888888.png?raw=true "Call")
![Call](https://github.com/mistakeone/nervos_first_try/blob/master/7%20task/8888881.png?raw=true "Call")
![Call](https://github.com/mistakeone/nervos_first_try/blob/master/7%20task/8888888.png?raw=true "Call")
![Call](https://github.com/mistakeone/nervos_first_try/blob/master/7%20task/888888888.png?raw=true "Call")


2. https://github.com/mistakeone/nervos_first_try/tree/master/projects/polyjuice-ported-voting-dapp-master

3. Contract address: 0x60bA43082F4E8F78c030b946e3333766B32109E9
   Tx hash: 0xc479abee8941713e0f0d8e75659c540e211c1091c96748ac089ce1291440d909

ABI;

[
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "name": "votesReceived",
      "outputs": [
        {
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "candidateList",
      "outputs": [
        {
          "name": "",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "candidateNames",
          "type": "bytes32[]"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "candidate",
          "type": "bytes32"
        }
      ],
      "name": "totalVotesFor",
      "outputs": [
        {
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "candidate",
          "type": "bytes32"
        }
      ],
      "name": "voteForCandidate",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "candidate",
          "type": "bytes32"
        }
      ],
      "name": "validCandidate",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
]
