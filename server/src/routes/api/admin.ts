import express from "express";
import keccak256 from "keccak256";
import { initObject } from "../../main";
import { rejectedRequests } from "./employer";

const router = express.Router();

router.post("/approve-rejection-request", async (req, res) => {
    const { privateKey, myAddress, delanceContract, web3, account } =
        await initObject;
    const firstRejectedRequest = rejectedRequests[0];
    const { employerAddress, freelancerAddress } = firstRejectedRequest;

    const hash = keccak256(
        web3.eth.abi.encodeParameters(
            ["address", "address", "address"],
            [freelancerAddress, employerAddress, myAddress]
        )
    ).toString();

    const signedData = web3.eth.accounts
        .privateKeyToAccount(privateKey)
        .sign(hash);

    try {
        const response = await delanceContract.methods
            .approveEmployerRejectionByAdmin("")
            .send({ from: account.address, gas: "31000" });

        const testFlag = await delanceContract.methods.testFlag().call();

        console.log({ testFlag, response });
    } catch (error) {
        console.log({ error });
    }

    // .send({ from: myAddress });

    res.send("success");
    // res.send(await web3.eth.getBalance(contractAddress));
});

export default router;
