type Props = {
    balance: string;
};

const Balance = ({ balance }: Props) => {
    return <p style={{ minHeight: 34 }}>{balance ?? 0}</p>;
};

export default Balance;
