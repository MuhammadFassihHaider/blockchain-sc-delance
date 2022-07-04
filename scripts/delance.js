const hre = require("hardhat");

async function main() {
    const [employer, freelancer, admin] = await ethers.getSigners();
    const Delance = await hre.ethers.getContractFactory("Delance");
    const delance = await Delance.deploy(
        employer.address,
        freelancer.address,
        admin.address,
        1664433591,
        {
            value: "3000000000000000000",
        }
    );

    await delance.deployed();

    console.log("Delance deployed to:", delance.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
