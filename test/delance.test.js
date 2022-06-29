const { expect } = require("chai");
const { ethers } = require("hardhat");

const initializeContract = async () => {
    const freelancerAddress = "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2";
    const deadline = 1664433591;

    const Delance = await ethers.getContractFactory("Delance");
    const delance = await Delance.deploy(freelancerAddress, deadline);
    await delance.deployed();
    return { delance, freelancerAddress, deadline };
}

describe("Delance", function () {
    it("Should initialize values in constructor", async () => {
        const { delance, deadline, freelancerAddress } = await initializeContract();

        expect(await delance.freelancer()).to.equal(freelancerAddress);
        expect(await delance.deadline()).to.equal(deadline);
    });

    it("Should correctly set deadline", async () => {
        const { delance, deadline } = await initializeContract();

        const setDeadline = await delance.setDeadline(deadline + 5)
        await setDeadline.wait()

        expect(await delance.deadline()).to.equal(deadline + 5);
    });

    it("Should correctly set freelancerAddress", async () => {
        const { delance, freelancerAddress } = await initializeContract();
        const updatedFreelancerAddress = "0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db";
        const setFreelancer = await delance.setAddress(updatedFreelancerAddress)
        await setFreelancer.wait();

        expect(await delance.freelancer()).to.equal(updatedFreelancerAddress)

    })
});
