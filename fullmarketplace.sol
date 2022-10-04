// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract MarketPlace {
    uint256 latestItemID = 0;
    uint256 transactionID = 0;
    enum Status {
        ORDERED,
        SHIPPING,
        RECEIVED
    }
    struct Item {
        uint256 itemID;
        string metadata;
        address payable seller;
        uint256 price;
        uint256 stock;
    }
    struct Transaction {
        uint256 transactionID;
        uint256 itemID;
        uint256 price;
        address payable seller;
        address receiver;
        Status status;
        uint256 date;
    }
    // this dictionary act as a in memory database for storing the items information
    mapping(uint256 => Item) db;
    // this dictionary stores all the transaction history information inside
    mapping(uint256 => Transaction) transactions;

    event itemCreated(Item itemCreated);
    event transactionMade(Transaction transaction_made);

    // create a new item, assign an item id for the item to address it, the seller should set the metadatas here.
    function createItem(
        address payable seller,
        string memory metadata,
        uint256 price,
        uint256 count
    ) public payable {
        require(count > 0, "Number of items must be greater than 0");
        uint256 currentItemID = latestItemID;
        Item memory item = Item(currentItemID, metadata, seller, price, count);
        db[currentItemID] = item;
        emit itemCreated(item);
        latestItemID += 1;
    }

    // this function will change the item price addressed using the item id
    function changeItemPrice(uint256 itemID, uint256 price) public payable {
        require(itemID < latestItemID, "Invalid itemID provided!");
        require(
            msg.sender == db[itemID].seller,
            "Only the seller is allowed to change the price!"
        );
        db[itemID].price = price;
    }

    // this function will access the item using the item id and change the stock in the database accordingly
    function changeItemStock(uint256 itemID, uint256 count) public payable {
        require(itemID < latestItemID, "Invalid itemID provided!");
        require(
            msg.sender == db[itemID].seller,
            "Only the seller is allowed to change the price!"
        );
        db[itemID].stock = count;
    }

    // this function will access the item using the item id and change the item metadata in the database accordingly
    function changeItemMetadata(uint256 itemID, string memory metadata)
        public
        payable
    {
        require(itemID < latestItemID, "Invalid itemID provided!");
        require(
            msg.sender == db[itemID].seller,
            "Only the seller is allowed to change the metadata!"
        );
        db[itemID].metadata = metadata;
    }

    // this function will access the available items from the latest created to earliest
    function getAvailableItems(uint256 offset, uint256 limit)
        public
        view
        returns (Item[] memory)
    {
        require(latestItemID > 0, "No items created yet.");
        if (latestItemID < limit) {
            limit = latestItemID;
        }
        Item[] memory items = new Item[](limit);
        uint256 index = 0;
        for (uint256 i = latestItemID; i > 0; i--) {
            if (db[i - 1].stock > 0) {
                if (offset > 0) {
                    offset--;
                    continue;
                }
                items[index++] = db[i - 1];
                if (index >= limit) {
                    break;
                }
            }
        }
        return items;
    }

    //// these functions are used to retrieve information of the item, but can simply use the function getItem instead
    // function getItemBalance(uint256 itemID) public view returns (uint256) {
    //     return db[itemID].stock;
    // }

    // function getItemPrice(uint256 itemID) public view returns (uint256) {
    //     return db[itemID].price;
    // }

    // function getItemMetadata(uint256 itemID)
    //     public
    //     view
    //     returns (string memory)
    // {
    //     return db[itemID].metadata;
    // }
    //// this function helps retrieve the item information using the item id
    function getItem(uint256 itemID) public view returns (Item memory) {
        return db[itemID];
    }

    // the buyer call this function to buy the item, this will create a new transaction, the stock in the database will be decreased by 1
    function buyItem(address receiver, uint256 itemID) public payable {
        require(itemID < latestItemID, "Invalid itemID provided!");
        require(db[itemID].stock > 0, "Sorry no more stock");
        require(msg.value >= db[itemID].price, "Insufficient value provided!");
        // send 1/4 of the price to the seller when the buyer buy the item
        uint256 value_to_seller = db[itemID].price / 4;
        require(
            db[itemID].seller.send(value_to_seller),
            "Failed to buy the item!"
        );
        uint256 currentTransactionID = transactionID;
        Transaction memory trans = Transaction(
            currentTransactionID,
            itemID,
            db[itemID].price,
            db[itemID].seller,
            receiver,
            Status.ORDERED,
            block.timestamp
        );
        db[itemID].stock--;
        transactions[currentTransactionID] = trans;
        emit transactionMade(trans);
        transactionID++;
    }

    // check the transaction status using the transaction id
    function checkTransactionStatus(uint256 transaction_id)
        public
        view
        returns (Transaction memory)
    {
        require(transaction_id < transactionID, "Invalid transaction id");
        return transactions[transaction_id];
    }

    // buyer can call this function to set the transaction status to complete and this will send the remaining amount to the seller
    function buyerReceived(uint256 transaction_id) public payable {
        require(transaction_id < transactionID, "Invalid transaction id");
        require(msg.sender == transactions[transaction_id].receiver);
        require(
            transactions[transaction_id].status != Status.RECEIVED,
            "Transaction have already completed"
        );
        transactions[transaction_id].status = Status.RECEIVED;
        uint256 value_to_seller = (transactions[transaction_id].price / 4) * 3;
        require(
            transactions[transaction_id].seller.send(value_to_seller),
            "Failed to send the remaining value to the seller"
        );
    }

    // seller can only compelete order after 14 days, if the buyer clicked on transaction have already completed then the function call will fail
    function sellerCompleteOrder(uint256 transaction_id) public payable {
        require(transaction_id < transactionID, "Invalid transaction id");
        require(
            transactions[transaction_id].status != Status.RECEIVED,
            "Transaction have already completed"
        );
        uint256 enddate = transactions[transaction_id].date + 14 days;
        require(
            block.timestamp > enddate,
            "Please wait the receiver to complete the order or wait until the timeout!"
        );

        uint256 value_to_seller = (transactions[transaction_id].price / 4) * 3;
        require(
            transactions[transaction_id].seller.send(value_to_seller),
            "Failed to send the remaining value to the seller"
        );
    }
}
