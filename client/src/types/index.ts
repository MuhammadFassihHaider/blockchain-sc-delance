import { Dispatch, SetStateAction } from "react";

export type TTab = "freelancer" | "employer";

export type TUserAddresses = {
    freelancer: string;
    employer: string;
};

export type TCreateRequestValues = {
    requestAmount: number;
    requestTitle: string;
};

export type TSetState<T> = Dispatch<SetStateAction<T>>;

export type TODO = any;
