const { ethers, waffle } = require("hardhat");
const chai = require("chai");
const { solidity } = require("ethereum-waffle");
chai.use(solidity);
const { expect } = chai;

const DEADLINE = 1664433591;
const _3_Eths = "3";
const ONLY_FREELANCER = "Only freelancer!";
const ONLY_EMPLOYER = "Only employer!";
const ELEMENT_DOES_NOT_EXIST_IN_ARRAY = "Element does not exist in array!";
const REQUEST_LOCKED = "Request locked!";
const REQUEST_PAID = "Request paid!";

describe("Delance", function () {
    let delance;

    const createValidRequest = async () => {
        const [_, freelancer] = await ethers.getSigners();
        const createRequest = await delance
            .connect(freelancer)
            .createRequest(1, "Title");
        await createRequest.wait();
    };

    beforeEach(async () => {
        const [_, freelancer] = await ethers.getSigners();
        const Delance = await ethers.getContractFactory("Delance");
        delance = await Delance.deploy(freelancer.address, DEADLINE, {
            value: _3_Eths,
        });

        await delance.deployed();
    });

    it("Should initialize values in constructor", async () => {
        const [_, freelancer] = await ethers.getSigners();

        expect(await delance.freelancer()).to.equal(freelancer.address);
        expect(await delance.deadline()).to.equal(DEADLINE);
    });

    it("Should correctly set project deadline", async () => {
        const setDeadline = await delance.setDeadline(DEADLINE + 5);
        await setDeadline.wait();

        expect(await delance.deadline()).to.equal(DEADLINE + 5);
    });

    it("Should correctly set freelancerAddress", async () => {
        const signers = await ethers.getSigners();

        const setFreelancer = await delance.setAddress(signers[2].address);
        await setFreelancer.wait();

        expect(await delance.freelancer()).to.equal(signers[2].address);
    });

    it("Should not create request if amount is less than 1", async () => {
        const [_, freelancer] = await ethers.getSigners();
        expect(
            delance.connect(freelancer).createRequest(0, "Some title")
        ).to.be.revertedWith("Should be greater than 0!");
    });

    it("Should not create request if called by employer", async () => {
        const [employer] = await ethers.getSigners();
        expect(
            delance.connect(employer).createRequest(0, "Some title")
        ).to.be.revertedWith(ONLY_FREELANCER);
    });

    it("Should create request with correct arguments", async () => {
        await createValidRequest();

        const getRequests = await delance.getRequests();
        const [amount, title, locked, paid] = getRequests[0];

        expect(amount).to.be.eq(ethers.BigNumber.from(1));
        expect(title).to.be.eq("Title");
        expect(locked).to.be.true;
        expect(paid).to.to.be.false;
    });

    it("Should unlock request when calling unlockRequest function", async () => {
        await createValidRequest();

        const unlockRequestTx = await delance.unlockRequest(0);
        await unlockRequestTx.wait();

        const getRequests = await delance.getRequests();
        const [amount, title, locked, paid] = getRequests[0];

        expect(amount).to.be.eq(ethers.BigNumber.from(1));
        expect(title).to.be.eq("Title");
        expect(locked).to.be.false;
        expect(paid).to.to.be.false;
    });

    it("Should fail if unlockRequest called by freelancer", async () => {
        const [_, freelancer] = await ethers.getSigners();
        await createValidRequest();

        expect(delance.connect(freelancer).unlockRequest(0)).to.be.revertedWith(
            ONLY_EMPLOYER
        );
    });

    it("Should only be able to call payRequest as freelancer", async () => {
        expect(delance.payRequest(0)).to.be.revertedWith(ONLY_FREELANCER);
    });

    it("Should revert if request does not exist", async () => {
        const [_, freelancer] = await ethers.getSigners();
        await createValidRequest();

        expect(delance.connect(freelancer).payRequest(5)).to.be.revertedWith(
            ELEMENT_DOES_NOT_EXIST_IN_ARRAY
        );
    });

    it("Should revert if request is locked", async () => {
        const [_, freelancer] = await ethers.getSigners();
        await createValidRequest();

        expect(delance.connect(freelancer).payRequest(0)).to.be.revertedWith(
            REQUEST_LOCKED
        );
    });

    it("Should be able to transfer amount to freelancer", async () => {
        const [_, freelancer] = await ethers.getSigners();
        await createValidRequest();

        const unlockRequestTx = await delance.unlockRequest(0);
        await unlockRequestTx.wait();

        const payRequestTx = await delance.connect(freelancer).payRequest(0);
        await payRequestTx.wait();

        expect(await delance.payRequestLocked()).to.be.false;
    });

    it("Should revert if request is already paid", async () => {
        const [_, freelancer] = await ethers.getSigners();
        await createValidRequest();

        const unlockRequestTx = await delance.unlockRequest(0);
        await unlockRequestTx.wait();

        const payRequestTx = await delance.connect(freelancer).payRequest(0);
        await payRequestTx.wait();

        expect(delance.connect(freelancer).payRequest(0)).to.be.revertedWith(
            REQUEST_PAID
        );
    });
});
