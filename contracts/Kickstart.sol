// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Kickstart {
    address payable owner;
    uint256 deadline;
    uint256 goal;
    uint8 numberOfPledgers;
    mapping(address => uint256) public pledgeOf;

    //to activate the Kickstart campaign
    constructor(uint256 numberOfDays, uint256 _goal) {
        owner = payable(msg.sender); //typecast into a payable
        deadline = block.timestamp + (numberOfDays * 1 days);
        goal = _goal;
    }

    modifier withDrawalPeiod() {
        require(block.timestamp >= deadline, "in the withdrawal period"); // in the withdrawal period
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "must be owner");
        _;
    }

    //this function is called when someone pledges
    function pledge(uint256 amount) public payable {
        require(block.timestamp < deadline, "must be before deadline");   // in the fundraising period
        require(msg.value == amount, "must pledge amount you have");
        require(msg.value > 0, "must pledge at least 1 wei");

        if (pledgeOf[msg.sender] == 0) {
            numberOfPledgers++;
        }
        pledgeOf[msg.sender] += amount;
    }

    //this function is called when the campaign has been completed and goals have been met
    function claimFunds() public withDrawalPeiod onlyOwner {
        require(address(this).balance >= goal, "must meet funding goal"); // funding goal met
        payable(msg.sender).transfer(address(this).balance); //typecast to payable
    }

    //this function is called when campaign has been completed but goals have not been met
    function getRefund() public withDrawalPeiod {
        require(address(this).balance < goal, "funding goal not met");  // funding goal not met

        uint256 amount = pledgeOf[msg.sender];
        pledgeOf[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }

    function getSummary() public view returns (uint256, uint256, uint8, uint256) {
        return (
        goal,
        address(this).balance,
        numberOfPledgers,
        deadline
        );
    }

    // only for testing purposes
    function alterDeadline(uint8 daysCount, bool add) public onlyOwner {
        if (add) {
            deadline = deadline + (daysCount * 1 days);
        } else {
            deadline = deadline - (daysCount * 1 days);
        }

    }
}
