const { ethers } = require("hardhat");
const chai = require("chai");
const { solidity } = require("ethereum-waffle");
chai.use(solidity);
const { expect } = chai;

const DEADLINE = 1664433591;

describe("Delance", function () {
    let delance;

    beforeEach(async () => {
        const [_, freelancer] = await ethers.getSigners()

        const Delance = await ethers.getContractFactory("Delance");

        delance = await Delance.deploy(freelancer.address, DEADLINE);
        await delance.deployed();
    })

    it("Should initialize values in constructor", async () => {
        const [_, freelancer] = await ethers.getSigners()

        expect(await delance.freelancer()).to.equal(freelancer.address);
        expect(await delance.deadline()).to.equal(DEADLINE);
    });

    it("Should correctly set project deadline", async () => {
        const setDeadline = await delance.setDeadline(DEADLINE + 5)
        await setDeadline.wait()

        expect(await delance.deadline()).to.equal(DEADLINE + 5);
    });

    it("Should correctly set freelancerAddress", async () => {
        const signers = await ethers.getSigners()

        const setFreelancer = await delance.setAddress(signers[2].address)
        await setFreelancer.wait();

        expect(await delance.freelancer()).to.equal(signers[2].address)
    });

    it("Should not create request if amount is less than 1", async () => {
        const [_, freelancer] = await ethers.getSigners()
        expect(delance.connect(freelancer).createRequest(0, "Some title")).to.be.revertedWith("Should be greater than 0!")
    })
});
