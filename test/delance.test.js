const { ethers } = require("hardhat");
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
const NO_AMOUNT_OWED_TO_FREELANCER = "No amount owed to freelancer!";
const WORK_WAS_NOT_APPROVED = "Work wasn't approved!";
const ONLY_ADMIN = "Only admin!";
const EMPLOYER_HAS_NOT_REJECTED_WORK = "Employer hasn't rejected work!";

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
        const [employer, freelancer, admin] = await ethers.getSigners();
        const Delance = await ethers.getContractFactory("Delance");
        delance = await Delance.deploy(
            employer.address,
            freelancer.address,
            admin.address,
            DEADLINE,
            {
                value: _3_Eths,
            }
        );

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

    const runValidPayRequest = async () => {
        const [_, freelancer] = await ethers.getSigners();
        await createValidRequest();

        const unlockRequestTx = await delance.unlockRequest(0);
        await unlockRequestTx.wait();

        const payRequestTx = await delance.connect(freelancer).payRequest(0);
        await payRequestTx.wait();

        return freelancer;
    };

    it("Should be able to transfer amount to freelancer", async () => {
        await runValidPayRequest();

        const request = await delance.requests(0);
        const amountToPayToFreelancer = await delance.amountToPayToFreelancer();

        expect(request.paid).to.be.true;
        expect(amountToPayToFreelancer).to.be.eq(request.amount);
    });

    it("Should revert if request is already paid", async () => {
        const freelancer = await runValidPayRequest();

        expect(delance.connect(freelancer).payRequest(0)).to.be.revertedWith(
            REQUEST_PAID
        );
    });

    it("Should have arguments passed to setFreelancerWorkRejected", async () => {
        expect(delance.setFreelancerWorkRejected()).to.be.reverted;
    });

    it("Should reject freelancer work only by employer", async () => {
        const [_, freelancer] = await ethers.getSigners();

        expect(
            delance.connect(freelancer).setFreelancerWorkRejected(true)
        ).to.be.revertedWith(ONLY_EMPLOYER);
    });

    it("Should only reject freelancer work if there is amount to reject", async () => {
        expect(delance.setFreelancerWorkRejected(true)).to.be.revertedWith(
            NO_AMOUNT_OWED_TO_FREELANCER
        );
    });

    it("Should reject freelancer work", async () => {
        // to have amount to reject
        await runValidPayRequest();

        const rejectFreelancerWorkTx = await delance.setFreelancerWorkRejected(
            true
        );
        await rejectFreelancerWorkTx.wait();

        const isFreelancerWorkRejected =
            await delance.isFreelancerWorkRejected();

        expect(isFreelancerWorkRejected).to.be.eq(true);
    });

    it("Should approve freelancer work", async () => {
        await runValidPayRequest();

        const rejectFreelancerWorkTx = await delance.setFreelancerWorkRejected(
            false
        );
        await rejectFreelancerWorkTx.wait();

        const isFreelancerWorkRejected =
            await delance.isFreelancerWorkRejected();

        expect(isFreelancerWorkRejected).to.be.eq(false);
    });

    it("Should revert withdrawAmountByFreelancer if called by user other than freelancer", async () => {
        expect(delance.withdrawAmountByFreelancer()).to.be.revertedWith(
            ONLY_FREELANCER
        );
    });

    it("Should revert if there is no amount to withdraw", async () => {
        const [_, freelancer] = await ethers.getSigners();
        expect(
            delance.connect(freelancer).withdrawAmountByFreelancer()
        ).to.be.revertedWith(NO_AMOUNT_OWED_TO_FREELANCER);
    });

    it("Should revert if work was not approved by employer", async () => {
        const [_, freelancer] = await ethers.getSigners();
        await runValidPayRequest();

        expect(
            delance.connect(freelancer).withdrawAmountByFreelancer()
        ).to.be.revertedWith(WORK_WAS_NOT_APPROVED);
    });

    it("Should allow freelancer to withdraw amount", async () => {
        const freelancer = await runValidPayRequest();

        // approve freelancer work
        const setFreelancerWorkRejectedTx =
            await delance.setFreelancerWorkRejected(false);
        await setFreelancerWorkRejectedTx.wait();

        // withdraw amount by freelancer
        const withdrawAmountByFreelancerTx = await delance
            .connect(freelancer)
            .withdrawAmountByFreelancer();
        await withdrawAmountByFreelancerTx.wait();

        // get values to check after withdraw
        const amountToPayToFreelancer = await delance.amountToPayToFreelancer();
        const isFreelancerWorkRejected =
            await delance.isFreelancerWorkRejected();

        expect(isFreelancerWorkRejected).to.be.eq(true);
        expect(amountToPayToFreelancer).to.be.eq(0);
    });

    it("Should only approve employer rejection if called by admin", async () => {
        expect(delance.approveEmployerRejectionByAdmin()).to.be.revertedWith(
            ONLY_ADMIN
        );
    });

    it("Should only run if employer has rejected freelancer's work", async () => {
        const [_, __, admin] = await ethers.getSigners();

        await runValidPayRequest();

        // approve freelancer work
        const setFreelancerWorkRejectedTx =
            await delance.setFreelancerWorkRejected(false);
        await setFreelancerWorkRejectedTx.wait();

        expect(
            delance.connect(admin).approveEmployerRejectionByAdmin()
        ).to.be.revertedWith(EMPLOYER_HAS_NOT_REJECTED_WORK);
    });

    it("Should transfer the amount to employer if admin approves", async () => {
        const [_, __, admin] = await ethers.getSigners();
        await runValidPayRequest();

        const approveEmployerRejectionByAdminTx = await delance
            .connect(admin)
            .approveEmployerRejectionByAdmin();
        await approveEmployerRejectionByAdminTx.wait();

        const amountToPayToFreelancer = await delance.amountToPayToFreelancer();

        expect(amountToPayToFreelancer).to.be.eq(0);
    });
});
