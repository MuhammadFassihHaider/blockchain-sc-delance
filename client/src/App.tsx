import { ChangeEventHandler, useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { AllRequestTable } from "./components/AllRequestTable";
import { Balance } from "./components/Balance";
import { FreelancerRequestForm } from "./components/FreelancerRequestForm";
import { Tabs } from "./components/Tabs";
import { Delance } from "./generated-contract-types/contracts/Delance";
import { TCreateRequestValues, TODO, TTab, TUserAddresses } from "./types";
import { classNames } from "./utils/classNames";
import { contractAbi, contractAddress } from "./utils/constants";

function App() {
    // useEffect(() => {
    //     ethEnabled();
    // }, []);
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
    const [metaMaskAccounts, setMetaMaskAccounts] = useState<string[]>([]);
    const [web3js, setWeb3js] = useState<Web3>();
    const [delanceContract, setDelanceContract] = useState<Delance>();
    const [isFreelancerWorkRejected, setIsFreelancerWorkRejected] =
        useState(true);

    const getUserAddresses = useCallback(async () => {
        const freelancer = await delanceContract?.methods.freelancer().call();
        const employer = await delanceContract?.methods.employer().call();

        if (freelancer && employer) {
            setUserAddresses({
                freelancer,
                employer,
            });
        }
    }, [delanceContract?.methods]);

    const getContractBalance = useCallback(async () => {
        if (!web3js) return;
        const _balance = await web3js.eth.getBalance(contractAddress);
        console.log({ _balance });
        setBalance(_balance);
    }, [web3js]);

    const ethEnabled = async () => {
        let provider = (window as any).ethereum;
        if (!!provider) {
            try {
                const accounts: string[] = await provider.request({
                    method: "eth_requestAccounts",
                });
                setMetaMaskAccounts(accounts);
            } catch (error: any) {
                if (error.code === 401) {
                    // User rejected request
                }
            }
        }
        const web3 = new Web3(provider);
        setWeb3js(web3);

        const delanceContract: Delance = new web3.eth.Contract(
            contractAbi as AbiItem[],
            contractAddress
        ) as TODO;

        setDelanceContract(delanceContract);
    };

    const getFreelancerRequests = useCallback(async () => {
        try {
            const requests: any = await delanceContract?.methods
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
    }, [delanceContract?.methods, getContractBalance]);

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
            console.log({
                userAddresses: web3js?.utils.isAddress(
                    userAddresses.freelancer
                ),
            });
            await delanceContract?.methods
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
            await delanceContract?.methods
                .unlockRequest(index)
                .send({ from: userAddresses.employer });
            await getFreelancerRequests();
        } catch (error) {
            console.log({ error });
        }
    };

    const onClickWithdrawRequest = async (index: number) => {
        try {
            await delanceContract?.methods
                .payRequest(index)
                .send({ from: userAddresses.freelancer });
            await getFreelancerRequests();
        } catch (error) {}
    };

    console.log({ isConnectedToMetaMask: metaMaskAccounts, userAddresses });

    const onClickConnect = async () => {
        await ethEnabled();
    };

    const onClickApproveFreelancerWork = async () => {
        try {
            await delanceContract?.methods
                .setFreelancerWorkRejected(false)
                .send({ from: userAddresses.employer });
            const isFreelancerWorkRejected = await delanceContract?.methods
                .isFreelancerWorkRejected()
                .call();
            isFreelancerWorkRejected !== undefined &&
                setIsFreelancerWorkRejected(isFreelancerWorkRejected);
        } catch (error) {
            console.log({ error });
        }
    };

    const onClickWithdrawMoneyAsFreelancer = async () => {
        try {
            await delanceContract?.methods
                ?.withdrawAmountByFreelancer()
                .send({ from: userAddresses.freelancer });
        } catch (error) {
            console.log({ error });
        }
    };

    console.log({ isFreelancerWorkRejected });

    useEffect(() => {
        if (metaMaskAccounts.length > 0) {
            getUserAddresses();
            getFreelancerRequests();
            getContractBalance();
        }
    }, [
        getContractBalance,
        getFreelancerRequests,
        getUserAddresses,
        metaMaskAccounts,
    ]);

    return (
        <div className="p-4 flex justify-center">
            <div className="w-[530px]">
                <button
                    className={classNames(
                        "w-full mb-8 text-white rounded-md py-3",
                        metaMaskAccounts.length > 0
                            ? "bg-green-600 hover:bg-green-800"
                            : "bg-rose-600 hover:bg-rose-800"
                    )}
                    onClick={onClickConnect}
                >
                    {metaMaskAccounts.length > 0 ? "Connected" : "Connect"}
                </button>

                <button onClick={onClickApproveFreelancerWork}>
                    Approve freelancer work
                </button>

                <button onClick={onClickWithdrawMoneyAsFreelancer}>
                    Withdraw money as freelancer
                </button>

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
