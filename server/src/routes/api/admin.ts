import express from "express";
import keccak256 from "keccak256";
import { initObject } from "../../main";
import { rejectedRequests } from "./employer";

const router = express.Router();

router.post("/approve-rejection-request", async (req, res) => {
    const {
        privateKeyAdmin,
        admin,
        employer,
        freelancer,
        delanceContract,
        web3,
    } = await initObject;


    const hash =
        web3.utils
            .soliditySha3(
                { type: "address", value: freelancer },
                { type: "address", value: admin },
                { type: "address", value: employer }
            )
            ?.toString() ?? "";

    const signedData = web3.eth.accounts
        .privateKeyToAccount(privateKeyAdmin)
        .sign(hash);

    const data = {
        freelancer,
        admin,
        employer,
    };


    try {
        const estimatedGas = await delanceContract.methods
            .approveEmployerRejectionByAdmin(signedData.signature, data)
            .estimateGas();

        const response = await delanceContract.methods
            .approveEmployerRejectionByAdmin(signedData.signature, data)
            .send({ from: admin, gas: estimatedGas });

        // const admin = await delanceContract.methods.admin().call();
        const _response =
            response.events?.AmountTransferredToEmployer?.returnValues;

        const recoveredFromContractValues = web3.eth.accounts.recover(
            _response.hashSwap,
            _response._hash
        );

        // console.log({ admin, response: _response, hash: hash.toString() });
        console.log({ recoveredContract: _response.recovered });
        console.log({ recoveredFromContractValues });
        console.log({ hashSwap: _response.hashSwap, hash: _response._hash });
    } catch (error) {
        console.log({ error });
    }

    res.send("success");
});

export default router;
