const hre = require("hardhat");

async function main() {
    const [employer, freelancer, admin] = await ethers.getSigners();
    console.log({ employer, freelancer, admin });
    const Delance = await hre.ethers.getContractFactory("Delance");
    const delance = await Delance.deploy(
        employer.address,
        "0x88f03b93459cbfaf0f1431f2e54aada7ae0dded3",
        "0x88f03b93459cbfaf0f1431f2e54aada7ae0dded3",
        1664433591,
        {
            value: "30000000",
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
