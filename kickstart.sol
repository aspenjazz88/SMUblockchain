pragma solidity ^0.5.0;

contract Kickstart {
    address owner;
    uint256 deadline;
    uint256 goal;
    mapping(address => uint256) public pledgeOf;

//this function, may be changed to constructor, can be run in the beginning
//to activate the Kickstart campaign.  
    function Kickstarting(uint256 numberOfDays, uint256 _goal) public {
        owner = msg.sender;
        deadline = now + (numberOfDays * 1 days);
        goal = _goal;
    }

//this function is called when someone pledges
    function pledge(uint256 amount) public payable {
        require(now < deadline);                // in the fundraising period
        require(msg.value == amount);

        pledgeOf[msg.sender] += amount;
    }

//this function is called when the campaign has been completed and goals have been met
    function claimFunds() public {
        require(address(this).balance >= goal); // funding goal met
        require(now >= deadline);               // in the withdrawal period
        require(msg.sender == owner);

        msg.sender.transfer(address(this).balance);
    }

//this function is called when campaign has been completed but goals have not been met 
    function getRefund() public {
        require(address(this).balance < goal);  // funding goal not met
        require(now >= deadline);               // in the withdrawal period

        uint256 amount = pledgeOf[msg.sender];
        pledgeOf[msg.sender] = 0;
        msg.sender.transfer(amount);
    }

}
