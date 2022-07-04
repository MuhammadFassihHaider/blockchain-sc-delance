// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.15;
import "hardhat/console.sol";

contract Delance {
    bool public reentrantPreventionFlag = false;
    // work is rejected by default
    bool public isFreelancerWorkRejected = true;
    address payable public freelancer;
    address payable public employer;
    address admin;
    uint256 public deadline;
    uint256 public price;
    uint256 public amountToPayToFreelancer = 0;
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

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin!");
        _;
    }

    modifier shouldHaveAmountToReject() {
        require(amountToPayToFreelancer > 0, "No amount owed to freelancer!");
        _;
    }

    constructor(
        address payable _employer,
        address payable _freelancer,
        address _admin,
        uint256 _deadline
    ) payable {
        freelancer = _freelancer;
        employer = _employer;
        admin = _admin;
        // global variable property: has the address of
        // sender who called constructor
        deadline = _deadline;
        // global variable property: contains eth sent to contract
        price = msg.value;
    }

    function transferAmount(address payable to, uint256 amount) private {
        // lock from here - transfer start
        reentrantPreventionFlag = true;

        // second return value: bytes memory transactionBytes
        (bool success, ) = to.call{value: amount}("");

        require(success, "Transfer failed!");

        // unlock here - transfer end
        reentrantPreventionFlag = false;
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

    function unlockRequest(uint256 _indexOfRequest) public onlyEmployer {
        Request storage request = requests[_indexOfRequest];

        require(request.locked == true, "Already locked!");
        request.locked = false;

        emit RequestUnlocked(request.locked);
    }

    function payRequest(uint256 indexOfRequestToPay) public onlyFreelancer {
        // require(!reentrantPreventionFlag, "Reentrant detected!");

        uint256 lengthOfRequests = requests.length;

        require(
            indexOfRequestToPay < lengthOfRequests,
            "Element does not exist in array!"
        );

        Request storage request = requests[indexOfRequestToPay];

        require(!request.locked, "Request locked!");
        require(!request.paid, "Request paid!");

        amountToPayToFreelancer += request.amount;
        request.paid = true;
        // lock from here - transfer start
        // reentrantPreventionFlag = true;

        // // second return value: bytes memory transactionBytes
        // (bool success, ) = freelancer.call{value: request.amount}("");

        // require(success, "Transfer failed!");

        // unlock here - transfer end
        // reentrantPreventionFlag = false;

        emit RequestPaid(msg.sender, request.amount);
    }

    function setFreelancerWorkRejected(bool _isFreelancerWorkRejected)
        public
        onlyEmployer
        shouldHaveAmountToReject
    {
        isFreelancerWorkRejected = _isFreelancerWorkRejected;
    }

    function approveEmployerRejectionByAdmin() public onlyAdmin {
        // transfer all the amount back to employer
        require(isFreelancerWorkRejected, "Employer hasn't rejected work!");

        transferAmount(employer, amountToPayToFreelancer);

        amountToPayToFreelancer = 0;
    }

    function withdrawAmountByFreelancer()
        public
        onlyFreelancer
        shouldHaveAmountToReject
    {
        // only run if work is approved
        require(!isFreelancerWorkRejected, "Work wasn't approved!");
        require(!reentrantPreventionFlag, "Reentrant detected!");

        transferAmount(freelancer, amountToPayToFreelancer);

        amountToPayToFreelancer = 0;
        isFreelancerWorkRejected = true;
    }

    // called when any ethers are sent to contract
    receive() external payable {
        price += msg.value;
    }
}
