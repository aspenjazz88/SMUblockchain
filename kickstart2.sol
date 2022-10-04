// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract Kickstart {
    address payable owner;
    uint256 deadline;
    uint256 goal;
    uint8 numberofpledgers;
    mapping(address => uint256) public pledgeOf;

//this function, may be changed to constructor, can be run in the beginning
//to activate the Kickstart campaign.  
    function Kickstarting(uint256 numberOfDays, uint256 _goal) public {
        owner = payable(msg.sender); //typecast into a payable
        deadline = block.timestamp + (numberOfDays * 1 days);
        goal = _goal;
    }

//this function is called when someone pledges
    function pledge(uint256 amount) public payable {
        require(block.timestamp < deadline);                // in the fundraising period
        require(msg.value == amount);

        pledgeOf[msg.sender] += amount;
        numberofpledgers+=1;
    }

//this function is called when the campaign has been completed and goals have been met
    function claimFunds() public {
        require(address(this).balance >= goal); // funding goal met
        require(block.timestamp >= deadline);               // in the withdrawal period
        require(msg.sender == owner);

        payable(msg.sender).transfer(address(this).balance); //typecast to payable
    }

//this function is called when campaign has been completed but goals have not been met 
    function getRefund() public {
        require(address(this).balance < goal);  // funding goal not met
        require(block.timestamp >= deadline);               // in the withdrawal period

        uint256 amount = pledgeOf[msg.sender];
        pledgeOf[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }

   function totalpledgers() public view returns (uint8) {
     return numberofpledgers;
    }
}
