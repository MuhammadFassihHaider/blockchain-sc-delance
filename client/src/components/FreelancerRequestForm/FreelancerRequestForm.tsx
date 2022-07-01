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
    return tabSelected === "Freelancer" ? (
        <div className="mb-12">
            <div className="flex flex-col mb-6">
                <div className="field__container mb-4">
                    <label className="field__label">Amount</label>
                    <input
                        name="requestAmount"
                        className="field__input"
                        value={createRequestValues.requestAmount}
                        placeholder="Enter amount"
                        onChange={onChangeCreateRequestInputs}
                        type={"number"}
                    />
                </div>
                <div className="field__container">
                    <label className="field__label">Title</label>
                    <input
                        name="requestTitle"
                        className="field__input"
                        value={createRequestValues.requestTitle}
                        placeholder="Enter title"
                        onChange={onChangeCreateRequestInputs}
                    />
                </div>
            </div>
            <button
                className="w-full bg-sky-500 text-white rounded-md py-3"
                onClick={onClickCreateRequest}
            >
                Create request
            </button>
        </div>
    ) : (
        <div className="min-h-[188px] mb-12"></div>
    );
};

export default FreelancerRequestForm;
