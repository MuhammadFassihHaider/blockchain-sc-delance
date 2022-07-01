import { TODO, TTab } from "../../types";

type Props = {
    tabSelected: TTab;
    allFreelancerRequests: TODO[];
    onClickUnlockRequest: (index: number) => void;
    onClickWithdrawRequest: (index: number) => void;
};

const AllRequestTable = ({
    tabSelected,
    onClickUnlockRequest,
    onClickWithdrawRequest,
    allFreelancerRequests,
}: Props) => {
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <table>
                <thead>
                    <th>Amount</th>
                    <th>Title</th>
                    <th>Locked</th>
                    <th>Paid</th>
                    <th>Action</th>
                </thead>

                <tbody>
                    {allFreelancerRequests.map((request, index) => {
                        return (
                            <tr key={request.amount + request.title + index}>
                                <td>{request.amount}</td>
                                <td>{request.title}</td>
                                <td>{request.locked ? "true" : "false"}</td>
                                <td>{request.paid ? "true" : "false"}</td>
                                {tabSelected === "employer" &&
                                    request.locked &&
                                    !request.paid && (
                                        <td>
                                            <button
                                                onClick={() =>
                                                    onClickUnlockRequest(index)
                                                }
                                            >
                                                Unlock
                                            </button>
                                        </td>
                                    )}
                                {tabSelected === "freelancer" &&
                                    !request.locked &&
                                    !request.paid && (
                                        <td>
                                            <button
                                                onClick={() =>
                                                    onClickWithdrawRequest(
                                                        index
                                                    )
                                                }
                                            >
                                                Withdraw
                                            </button>
                                        </td>
                                    )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default AllRequestTable;
