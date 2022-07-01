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
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Title
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Amount
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Locked
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Paid
                                    </th>
                                    <th
                                        scope="col"
                                        className="relative px-6 py-3"
                                    >
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {allFreelancerRequests.map((request, index) => (
                                    <tr
                                        key={
                                            request.amount +
                                            request.title +
                                            index
                                        }
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {request.title}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {request.amount}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {request.locked ? "true" : "false"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {request.paid ? "true" : "false"}
                                        </td>

                                        {tabSelected === "Employer" &&
                                            request.locked &&
                                            !request.paid && (
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium min-w-[115px]">
                                                    <p
                                                        className="table__button"
                                                        onClick={() =>
                                                            onClickUnlockRequest(
                                                                index
                                                            )
                                                        }
                                                    >
                                                        Unlock
                                                    </p>
                                                </td>
                                            )}
                                        {tabSelected === "Freelancer" &&
                                            !request.locked &&
                                            !request.paid && (
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium min-w-[115px]">
                                                    <p
                                                        className="table__button"
                                                        onClick={() =>
                                                            onClickWithdrawRequest(
                                                                index
                                                            )
                                                        }
                                                    >
                                                        Withdraw
                                                    </p>
                                                </td>
                                            )}
                                        {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <a
                                                href="#"
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit
                                            </a>
                                        </td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
    // return (
    //     <div className="flex justify-center">
    //         <table>
    //             <thead>
    //                 <th>Amount</th>
    //                 <th>Title</th>
    //                 <th>Locked</th>
    //                 <th>Paid</th>
    //                 <th>Action</th>
    //             </thead>

    //             <tbody>
    //                 {allFreelancerRequests.map((request, index) => {
    //                     return (
    //                         <tr key={request.amount + request.title + index}>
    //                             <td>{request.amount}</td>
    //                             <td>{request.title}</td>
    //                             <td>{request.locked ? "true" : "false"}</td>
    //                             <td>{request.paid ? "true" : "false"}</td>
    //                             {tabSelected === "Employer" &&
    //                                 request.locked &&
    //                                 !request.paid && (
    //                                     <td>
    //                                         <button
    //                                             onClick={() =>
    //                                                 onClickUnlockRequest(index)
    //                                             }
    //                                         >
    //                                             Unlock
    //                                         </button>
    //                                     </td>
    //                                 )}
    //                             {tabSelected === "Freelancer" &&
    //                                 !request.locked &&
    //                                 !request.paid && (
    //                                     <td>
    //                                         <button
    //                                             onClick={() =>
    //                                                 onClickWithdrawRequest(
    //                                                     index
    //                                                 )
    //                                             }
    //                                         >
    //                                             Withdraw
    //                                         </button>
    //                                     </td>
    //                                 )}
    //                         </tr>
    //                     );
    //                 })}
    //             </tbody>
    //         </table>
    //     </div>
    // );
};

export default AllRequestTable;
