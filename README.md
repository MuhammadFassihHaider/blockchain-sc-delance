# About the project

Delance is a freelancing platform in which the participants are a freelancer and an employer.
All of the freelancing projects have two important attributes: deadline and price. The employer wants to get the project before the deadline and the freelancer needs to get the project fee once he has delivered the project. The freelancer may also want to break the project to milestones and requests for payment after finishing each part. On the other hand, the employer would like to have some guarantee to make him sure the project will be delivered before the deadline.

# Configuration to run project

1. Run `yarn` or `npm install` in root directory.
2. Run `npx hardhat node` in root directory.
3. Run `yarn deploy-l` in root directory.
4. Copy address at which contract is deployed.
5. Change directory to client and run `yarn` or `npm install`.
6. Open `client/src/utils/constants` & replace the contract address with the copied address.
7. Run `yarn start` or `npm run start` in client.
8. If changes are made to the contract, run `gen-contract-types` to generate types for the contract to be consumed in React

# Reference

1. Followed tutorial by [Behzad Pournouri](https://bitnician.medium.com/solidity-smart-contract-tutorial-with-building-full-stack-dapp-part-1-introduction-65988e83b4a3) for creating contract.
2. Made a few changes to contract such as adding more `require` statements
3. Wrote tests myself.
4. Created client in React with web3.js myself
