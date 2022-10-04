pragma solidity ^0.5.0;
import "./Dice.sol";

contract DiceBattle {

    mapping(uint256 => address) ownership;
    Dice diceContract;

    event battleWin(uint256 winner, uint256 loser);
    event battleDraw(uint256 id, uint256 id2);

    constructor(Dice diceAddress) public {
        diceContract = diceAddress;
    }

    function list(uint256 id) public {
        require(diceContract.getOwner(id) == address(this));
        ownership[id] = diceContract.getPrevOwner(id);
    }

    function unlist(uint256 id) public {
        diceContract.transfer(id, ownership[id]);
        delete ownership[id];
    }

    function battle(uint256 id, uint256 id2) public {
        require(ownership[id] == msg.sender);
        require(ownership[id2] != address(0));

        diceContract.roll(id);
        diceContract.roll(id2);
        diceContract.stopRoll(id);
        diceContract.stopRoll(id2);

        if(diceContract.getDiceNumber(id) < diceContract.getDiceNumber(id2)){
            ownership[id] = ownership[id2];
            emit battleWin(id,id2);
        }
        if(diceContract.getDiceNumber(id) > diceContract.getDiceNumber(id2)){
            ownership[id2] = ownership[id];
            emit battleWin(id2,id);
        }
        if(diceContract.getDiceNumber(id) == diceContract.getDiceNumber(id2)){
            emit battleDraw(id,id2);
        }

    }

    function getOwner(uint256 id) public view returns (address) {
        return ownership[id];
    }


}
