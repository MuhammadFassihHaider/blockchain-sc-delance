import { ChangeEventHandler, useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { AllRequestTable } from "./components/AllRequestTable";
import { Balance } from "./components/Balance";
import { FreelancerRequestForm } from "./components/FreelancerRequestForm";
import { Tabs } from "./components/Tabs";
import { Delance } from "./generated-contract-types/contracts/Delance";
import { TCreateRequestValues, TODO, TTab, TUserAddresses } from "./types";
import { contractAbi, contractAddress } from "./utils/constants";

const web3 = new Web3("ws://localhost:8545");

const delanceContract: Delance = new web3.eth.Contract(
    contractAbi as AbiItem[],
    contractAddress
) as TODO;

function App() {
    const [tabSelected, setTabSelected] = useState<TTab>("Freelancer");
    const [createRequestValues, setCreateRequestValues] =
        useState<TCreateRequestValues>({
            requestAmount: 0,
            requestTitle: "",
        });
    const [userAddresses, setUserAddresses] = useState<TUserAddresses>({
        employer: "",
        freelancer: "",
    });
    const [allFreelancerRequests, setFreelancerRequests] = useState<TODO[]>([]);
    const [balance, setBalance] = useState("");

    const getUserAddresses = async () => {
        const freelancer = await delanceContract.methods.freelancer().call();
        const employer = await delanceContract.methods.employer().call();

        setUserAddresses({
            freelancer,
            employer,
        });
    };

    console.log({ tabSelected });

    const getContractBalance = async () => {
        const _balance = await web3.eth.getBalance(contractAddress);
        setBalance(_balance);
    };

    const getFreelancerRequests = useCallback(async () => {
        try {
            const requests: any = await delanceContract.methods
                .getRequests()
                .call();
            const formattedRequests = requests.map((request: any) => ({
                amount: request.amount,
                title: request.title,
                locked: request.locked,
                paid: request.paid,
            }));
            await getContractBalance();
            setFreelancerRequests(formattedRequests);
        } catch (error) {
            console.log({ error });
        }
    }, []);

    console.log({ allFreelancerRequests: allFreelancerRequests });

    const onClickCreateRequest: React.MouseEventHandler<
        HTMLButtonElement
    > = async (e) => {
        e.preventDefault();

        if (!userAddresses.freelancer) return;

        if (
            !createRequestValues.requestAmount &&
            !createRequestValues.requestTitle
        )
            return;

        const requestAmount = Number(createRequestValues.requestAmount);

        if (isNaN(requestAmount)) return;

        try {
            await delanceContract.methods
                .createRequest(
                    createRequestValues.requestAmount,
                    createRequestValues.requestTitle
                )
                .send({ from: userAddresses.freelancer });
            await getFreelancerRequests();
            setCreateRequestValues({
                requestAmount: 0,
                requestTitle: "",
            });
        } catch (error) {
            console.log({ error });
        }
    };

    const onChangeCreateRequestInputs: ChangeEventHandler<HTMLInputElement> = (
        e
    ) => {
        setCreateRequestValues({
            ...createRequestValues,
            [e.target.name]: e.target.value,
        });
    };

    const onClickUnlockRequest = async (index: number) => {
        try {
            await delanceContract.methods
                .unlockRequest(index)
                .send({ from: userAddresses.employer });
            await getFreelancerRequests();
        } catch (error) {
            console.log({ error });
        }
    };

    const onClickWithdrawRequest = async (index: number) => {
        try {
            await delanceContract.methods
                .payRequest(index)
                .send({ from: userAddresses.freelancer });
            await getFreelancerRequests();
        } catch (error) {}
    };

    useEffect(() => {
        getUserAddresses();
        getFreelancerRequests();
    }, [getFreelancerRequests]);

    return (
        <div className="p-4 flex justify-center">
            <div className="w-[530px]">
                <Balance balance={balance} />

                <Tabs
                    tabSelected={tabSelected}
                    setTabSelected={setTabSelected}
                />

                <div className="absolute right-20 top-28">
                    <FreelancerRequestForm
                        createRequestValues={createRequestValues}
                        onChangeCreateRequestInputs={
                            onChangeCreateRequestInputs
                        }
                        onClickCreateRequest={onClickCreateRequest}
                        tabSelected={tabSelected}
                    />
                </div>

                <AllRequestTable
                    allFreelancerRequests={allFreelancerRequests}
                    onClickUnlockRequest={onClickUnlockRequest}
                    onClickWithdrawRequest={onClickWithdrawRequest}
                    tabSelected={tabSelected}
                />
            </div>
        </div>
    );
}

export default App;
