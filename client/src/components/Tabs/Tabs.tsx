import { TSetState, TTab } from "../../types";

type Props = {
    setTabSelected: TSetState<TTab>;
};

const Tabs = ({ setTabSelected }: Props) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                gap: 8,
                marginBottom: 100,
            }}
        >
            <button onClick={() => setTabSelected("freelancer")}>
                Freelancer
            </button>
            <button onClick={() => setTabSelected("employer")}>Employer</button>
        </div>
    );
};

export default Tabs;
