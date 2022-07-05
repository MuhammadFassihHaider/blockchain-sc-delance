require("@nomiclabs/hardhat-waffle");
require("@typechain/hardhat");
require("@nomiclabs/hardhat-ethers");
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();
    console.log({ accounts });
    // for (const account of accounts) {
    //     console.log(account.address);
    // }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: "0.8.15",
    networks: {
        rinkeby: {
            url: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
            accounts: [
                process.env.PRIVATE_KEY ??
                    "36bff3e6b7b59c9e482692be6475bdefc546f0f8aab04a0a7daad052742ba36f",
            ],
        },
        bsc_testnet: {
            url: "https://speedy-nodes-nyc.moralis.io/38100d15d7add57a35ef73e8/bsc/testnet",
            accounts: [
                process.env.PRIVATE_KEY ??
                    "36bff3e6b7b59c9e482692be6475bdefc546f0f8aab04a0a7daad052742ba36f",
            ],
        },
        bsc_mainnet: {
            url: "https://nd-394-839-853.p2pify.com/88ffe2280a7cdab077b068e44f2d8e83",
            accounts: [
                process.env.PRIVATE_KEY ??
                    "36bff3e6b7b59c9e482692be6475bdefc546f0f8aab04a0a7daad052742ba36f",
            ],
        },
        eth_mainnet: {
            url: "https://nd-598-371-142.p2pify.com/1d8a0689eb5ea0ed48cd705e80235215",
            accounts: [
                process.env.PRIVATE_KEY ??
                    "36bff3e6b7b59c9e482692be6475bdefc546f0f8aab04a0a7daad052742ba36f",
            ],
        },
    },
    // gasReporter: {
    //     enabled: process.env.REPORT_GAS !== undefined,
    //     currency: "USD",
    // },
    // etherscan: {
    //     apiKey: process.env.ETHERSCAN_API_KEY,
    // },
};
