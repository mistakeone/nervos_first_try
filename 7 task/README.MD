1. ![Call](C:\Users\Алекс\Nervos\nervos_first_try\5 task\66666.png "Call")
![Call](C:\Users\Алекс\Nervos\nervos_first_try\5 task\66666.png "Call")
![Call](C:\Users\Алекс\Nervos\nervos_first_try\5 task\66666.png "Call")
![Call](C:\Users\Алекс\Nervos\nervos_first_try\5 task\66666.png "Call")
![Call](C:\Users\Алекс\Nervos\nervos_first_try\5 task\66666.png "Call")
![Call](C:\Users\Алекс\Nervos\nervos_first_try\5 task\66666.png "Call")
![Call](C:\Users\Алекс\Nervos\nervos_first_try\5 task\66666.png "Call")


2. address of the ERC20 Proxy: 0x2767d4eCCa5EDeAc25b03a46490A0abcA8F11382

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