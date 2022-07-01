import { useEffect } from "react";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { contractAbi, contractAddress } from "./utils/constants";
import { Delance } from "./generated-contract-types/contracts/Delance";

const web3 = new Web3("ws://localhost:8545");

const delanceContract: Delance = new web3.eth.Contract(
    contractAbi as AbiItem[],
    contractAddress
) as any;

function App() {
    async function getRequests() {
        const freelancer = await delanceContract.methods.freelancer().call();
        const employer = await delanceContract.methods.employer().call();

        console.log({ freelancer, employer });
        const requestResponse = await delanceContract.methods
            .createRequest("10000000000000000000", "FE completed")
            .send({ from: employer });
        const requests = await delanceContract.methods.getRequests().call();
        console.log({ requests, requestResponse });
    }
    useEffect(() => {
        getRequests();
    }, []);
    return (
        <div className="bg-red-300">
            <h1 className="bg-blue-200">hello</h1>
        </div>
    );
}

export default App;
