type Props = {
    balance: string;
};

const Balance = ({ balance }: Props) => {
    return (
        <div className="flex flex-col text-white mb-4 bg-sky-500 rounded-md shadow-md py-4 px-6 ">
            <p className="mb-2 text-white text-sm">Balance</p>
            <p className="text-2xl">
                {balance ?? 0} <span className="ml-1 text-sm">wei</span>{" "}
            </p>
        </div>
    );
};

export default Balance;
