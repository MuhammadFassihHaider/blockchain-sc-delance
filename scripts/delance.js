const hre = require("hardhat");

async function main() {
    const admin = "0xc1E666B95e69fF502400292063D6c8A5c1E8832b";
    const employer = "0x88f03b93459cbfAF0F1431F2e54aAda7AE0DdEd3";
    const freelancer = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const Delance = await hre.ethers.getContractFactory("Delance");
    const delance = await Delance.deploy(
        employer,
        freelancer,
        admin,
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
