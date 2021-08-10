1. ![Call](https://github.com/mistakeone/nervos_first_try/blob/master/7%20task/8888.png?raw=true "Call")
![Call](https://github.com/mistakeone/nervos_first_try/blob/master/7%20task/888881.png?raw=true "Call")
![Call](https://github.com/mistakeone/nervos_first_try/blob/master/7%20task/888888.png?raw=true "Call")
![Call](https://github.com/mistakeone/nervos_first_try/blob/master/7%20task/8888881.png?raw=true "Call")
![Call](https://github.com/mistakeone/nervos_first_try/blob/master/7%20task/8888888.png?raw=true "Call")
![Call](https://github.com/mistakeone/nervos_first_try/blob/master/7%20task/888888888.png?raw=true "Call")


2. https://github.com/mistakeone/nervos_first_try/tree/master/projects/polyjuice-ported-voting-dapp-master

3. 

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
