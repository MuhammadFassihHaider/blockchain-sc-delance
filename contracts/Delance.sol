// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;
import "hardhat/console.sol";

contract Delance {
    bool public payRequestLocked = false;
    address payable public freelancer;
    address payable public employer;
    uint256 public deadline;
    uint256 public price;
    Request[] public requests;

    struct Request {
        uint256 amount;
        string title;
        bool locked;
        bool paid;
    }

    event RequestUnlocked(bool locked);

    event RequestCreated(uint256 amount, string title, bool locked, bool paid);

    event RequestPaid(address receiver, uint256 amount);

    modifier onlyFreelancer() {
        // keep error messages small
        require(msg.sender == freelancer, "Only freelancer!");
        _;
    }

    modifier onlyEmployer() {
        require(msg.sender == employer, "Only employer!");
        _;
    }

    constructor(address payable _freelancer, uint256 _deadline) payable {
        freelancer = _freelancer;
        // global variable property: has the address of
        // sender who called constructor
        deadline = _deadline;
        employer = payable(msg.sender);
        // global variable property: contains eth sent to contract
        price = msg.value;
    }

    function getRequests() public view returns (Request[] memory) {
        return requests;
    }

    function setAddress(address payable _freelancer) public {
        freelancer = _freelancer;
    }

    function setDeadline(uint256 _deadline) public {
        deadline = _deadline;
    }

    function createRequest(uint256 _amount, string memory _title)
        public
        onlyFreelancer
    {
        require(_amount > 0, "Should be greater than 0!");

        Request memory request = Request({
            amount: _amount,
            title: _title,
            locked: true,
            paid: false
        });

        requests.push(request);

        emit RequestCreated(_amount, _title, request.locked, request.paid);
    }

    function payRequest(uint256 indexOfRequestToPay) public onlyFreelancer {
        require(!payRequestLocked, "Reentrant detected!");

        uint256 lengthOfRequests = requests.length;

        require(
            indexOfRequestToPay < lengthOfRequests,
            "Element does not exist in array!"
        );

        Request storage request = requests[indexOfRequestToPay];

        require(!request.locked, "Request locked!");
        require(!request.paid, "Request paid!");

        // lock from here - transfer start
        payRequestLocked = true;

        // second return value: bytes memory transactionBytes
        (bool success, ) = freelancer.call{value: request.amount}("");

        require(success, "Transfer failed!");

        request.paid = true;

        // unlock here - transfer end
        payRequestLocked = false;

        emit RequestPaid(msg.sender, request.amount);
    }

    function unlockRequest(uint256 _indexOfRequest) public onlyEmployer {
        Request storage request = requests[_indexOfRequest];

        require(request.locked == true, "Already locked!");
        request.locked = false;

        emit RequestUnlocked(request.locked);
    }

    // called when any ethers are sent to contract
    receive() external payable {
        price += msg.value;
    }
}
