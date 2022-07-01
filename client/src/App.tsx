import Web3 from "web3";
import { contractAbi, contractAddress } from "./utils/constants";
import { Delance } from "../../typechain-types/Delance";
const web3 = new Web3("ws://localhost:8545");

const delanceContract: Delance = new web3.eth.Contract(
    contractAbi,
    contractAddress
) as any;

function App() {
    return (
        <div className="bg-red-300">
            <h1 className="bg-blue-200">hello</h1>
        </div>
    );
}

export default App;
