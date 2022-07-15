export const abi = [
    {
        inputs: [
            {
                internalType: "address payable",
                name: "_employer",
                type: "address",
            },
            {
                internalType: "address payable",
                name: "_freelancer",
                type: "address",
            },
            {
                internalType: "address",
                name: "_admin",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_deadline",
                type: "uint256",
            },
        ],
        stateMutability: "payable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "bytes",
                name: "_hash",
                type: "bytes",
            },
            {
                indexed: false,
                internalType: "address",
                name: "recovered",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bytes32",
                name: "hashSwap",
                type: "bytes32",
            },
        ],
        name: "AmountTransferredToEmployer",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "string",
                name: "title",
                type: "string",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "locked",
                type: "bool",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "paid",
                type: "bool",
            },
        ],
        name: "RequestCreated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "receiver",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "RequestPaid",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "bool",
                name: "locked",
                type: "bool",
            },
        ],
        name: "RequestUnlocked",
        type: "event",
    },
    {
        inputs: [],
        name: "admin",
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
        name: "amountToPayToFreelancer",
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
                internalType: "bytes",
                name: "_signature",
                type: "bytes",
            },
            {
                components: [
                    {
                        internalType: "address",
                        name: "freelancer",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "admin",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "employer",
                        type: "address",
                    },
                ],
                internalType: "struct Delance.AffiliatedAddresses",
                name: "_affiliatedAddresses",
                type: "tuple",
            },
        ],
        name: "approveEmployerRejectionByAdmin",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "_title",
                type: "string",
            },
        ],
        name: "createRequest",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "deadline",
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
        inputs: [],
        name: "employer",
        outputs: [
            {
                internalType: "address payable",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "freelancer",
        outputs: [
            {
                internalType: "address payable",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getRequests",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "amount",
                        type: "uint256",
                    },
                    {
                        internalType: "string",
                        name: "title",
                        type: "string",
                    },
                    {
                        internalType: "bool",
                        name: "locked",
                        type: "bool",
                    },
                    {
                        internalType: "bool",
                        name: "paid",
                        type: "bool",
                    },
                ],
                internalType: "struct Delance.Request[]",
                name: "",
                type: "tuple[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "isFreelancerWorkRejected",
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
                internalType: "uint256",
                name: "indexOfRequestToPay",
                type: "uint256",
            },
        ],
        name: "payRequest",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "price",
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
        inputs: [],
        name: "reentrantPreventionFlag",
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
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "requests",
        outputs: [
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "title",
                type: "string",
            },
            {
                internalType: "bool",
                name: "locked",
                type: "bool",
            },
            {
                internalType: "bool",
                name: "paid",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address payable",
                name: "_freelancer",
                type: "address",
            },
        ],
        name: "setAddress",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_deadline",
                type: "uint256",
            },
        ],
        name: "setDeadline",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bool",
                name: "_isFreelancerWorkRejected",
                type: "bool",
            },
        ],
        name: "setFreelancerWorkRejected",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "testFlag",
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
                internalType: "uint256",
                name: "_indexOfRequest",
                type: "uint256",
            },
        ],
        name: "unlockRequest",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "withdrawAmountByFreelancer",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        stateMutability: "payable",
        type: "receive",
    },
];
