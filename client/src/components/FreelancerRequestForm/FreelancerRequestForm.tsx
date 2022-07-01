import { ChangeEventHandler, MouseEventHandler } from "react";
import { TCreateRequestValues, TTab } from "../../types";

type Props = {
    createRequestValues: TCreateRequestValues;
    onChangeCreateRequestInputs: ChangeEventHandler<HTMLInputElement>;
    onClickCreateRequest: MouseEventHandler<HTMLButtonElement>;
    tabSelected: TTab;
};

const FreelancerRequestForm = ({
    createRequestValues,
    onChangeCreateRequestInputs,
    onClickCreateRequest,
    tabSelected,
}: Props) => {
    return tabSelected === "freelancer" ? (
        <div
            className="freelancer"
            style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                marginBottom: 50,
            }}
        >
            <div
                style={{
                    display: "flex",
                    gap: 8,
                    marginBottom: 8,
                }}
            >
                <input
                    name="requestAmount"
                    value={createRequestValues.requestAmount}
                    placeholder="Enter amount"
                    onChange={onChangeCreateRequestInputs}
                    type={"number"}
                />
                <input
                    name="requestTitle"
                    value={createRequestValues.requestTitle}
                    placeholder="Enter title"
                    onChange={onChangeCreateRequestInputs}
                />
            </div>
            <button style={{ width: 378 }} onClick={onClickCreateRequest}>
                Create request
            </button>
        </div>
    ) : (
        <div style={{ minHeight: 100 }}></div>
    );
};

export default FreelancerRequestForm;
