// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;

contract Delance {
    address public freelancer;
    address public employer;
    uint256 public deadline;
    uint256 public price;

    constructor(address _freelancer, uint256 _deadline) payable {
        freelancer = _freelancer;
        // global variable property: has the address of sender
        deadline = _deadline;
        employer = msg.sender;
        // global variable property: contains eth sent to contract
        price = msg.value;
    }

    function setAddress(address _freelancer) public {
        freelancer = _freelancer;
    }

    function setDeadline(uint256 _deadline) public {
        deadline = _deadline;
    }

    // called when any ethers are sent to contract
    receive() external payable {
        price += msg.value;
    }
}
