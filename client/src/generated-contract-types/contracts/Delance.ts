/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import type BN from "bn.js";
import type { ContractOptions } from "web3-eth-contract";
import type { EventLog } from "web3-core";
import type { EventEmitter } from "events";
import type {
  Callback,
  PayableTransactionObject,
  NonPayableTransactionObject,
  BlockType,
  ContractEventLog,
  BaseContract,
} from "./types";

export interface EventOptions {
  filter?: object;
  fromBlock?: BlockType;
  topics?: string[];
}

export type RequestCreated = ContractEventLog<{
  amount: string;
  title: string;
  locked: boolean;
  paid: boolean;
  0: string;
  1: string;
  2: boolean;
  3: boolean;
}>;
export type RequestPaid = ContractEventLog<{
  receiver: string;
  amount: string;
  0: string;
  1: string;
}>;
export type RequestUnlocked = ContractEventLog<{
  locked: boolean;
  0: boolean;
}>;

export interface Delance extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): Delance;
  clone(): Delance;
  methods: {
    amountToPayToFreelancer(): NonPayableTransactionObject<string>;

    approveEmployerRejectionByAdmin(): NonPayableTransactionObject<void>;

    createRequest(
      _amount: number | string | BN,
      _title: string
    ): NonPayableTransactionObject<void>;

    deadline(): NonPayableTransactionObject<string>;

    employer(): NonPayableTransactionObject<string>;

    freelancer(): NonPayableTransactionObject<string>;

    getRequests(): NonPayableTransactionObject<
      [string, string, boolean, boolean][]
    >;

    isFreelancerWorkRejected(): NonPayableTransactionObject<boolean>;

    payRequest(
      indexOfRequestToPay: number | string | BN
    ): NonPayableTransactionObject<void>;

    price(): NonPayableTransactionObject<string>;

    reentrantPreventionFlag(): NonPayableTransactionObject<boolean>;

    requests(arg0: number | string | BN): NonPayableTransactionObject<{
      amount: string;
      title: string;
      locked: boolean;
      paid: boolean;
      0: string;
      1: string;
      2: boolean;
      3: boolean;
    }>;

    setAddress(_freelancer: string): NonPayableTransactionObject<void>;

    setDeadline(
      _deadline: number | string | BN
    ): NonPayableTransactionObject<void>;

    setFreelancerWorkRejected(
      _isFreelancerWorkRejected: boolean
    ): NonPayableTransactionObject<void>;

    unlockRequest(
      _indexOfRequest: number | string | BN
    ): NonPayableTransactionObject<void>;

    withdrawAmountByFreelancer(): NonPayableTransactionObject<void>;
  };
  events: {
    RequestCreated(cb?: Callback<RequestCreated>): EventEmitter;
    RequestCreated(
      options?: EventOptions,
      cb?: Callback<RequestCreated>
    ): EventEmitter;

    RequestPaid(cb?: Callback<RequestPaid>): EventEmitter;
    RequestPaid(
      options?: EventOptions,
      cb?: Callback<RequestPaid>
    ): EventEmitter;

    RequestUnlocked(cb?: Callback<RequestUnlocked>): EventEmitter;
    RequestUnlocked(
      options?: EventOptions,
      cb?: Callback<RequestUnlocked>
    ): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(event: "RequestCreated", cb: Callback<RequestCreated>): void;
  once(
    event: "RequestCreated",
    options: EventOptions,
    cb: Callback<RequestCreated>
  ): void;

  once(event: "RequestPaid", cb: Callback<RequestPaid>): void;
  once(
    event: "RequestPaid",
    options: EventOptions,
    cb: Callback<RequestPaid>
  ): void;

  once(event: "RequestUnlocked", cb: Callback<RequestUnlocked>): void;
  once(
    event: "RequestUnlocked",
    options: EventOptions,
    cb: Callback<RequestUnlocked>
  ): void;
}
