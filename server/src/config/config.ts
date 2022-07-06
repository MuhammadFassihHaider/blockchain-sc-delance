import dotenv from "dotenv";
import Web3 from "web3";
import { abi } from "../utils/Delance";

export const contractAbi = abi;

export const config = async () => {
    dotenv.config();

    // const web3 = createAlchemyWeb3(
    // );
    // await Moralis.start({
    //     serverUrl: "https://vbghjn8t07pd.usemoralis.com:2053/server",
    //     appId: "R3RxDjlsqqsChQ2rPZVMlqH76K4NSH1Ei36YfLhh",
    // });
    // const web3 = Moralis.enableWeb3();

    const contractAddress = process.env.CONTRACT_ADDRESS ?? "";
    const privateKey = process.env.PRIVATE_KEY ?? "";
    const myAddress = process.env.MY_ADDRESS ?? "";

    const web3 = new Web3(
        new Web3.providers.HttpProvider(process.env.API_URL ?? "")
    );

    const account = web3.eth.accounts.privateKeyToAccount(
        process.env.PRIVATE_KEY ?? ""
    );

    web3.eth.accounts.wallet.add(account);
    web3.eth.defaultAccount = account.address;

    const delanceContract = new web3.eth.Contract(
        contractAbi as any,
        contractAddress
    ) as any;

    return {
        contractAddress,
        privateKey,
        myAddress,
        delanceContract,
        web3,
        account,
    };
};
