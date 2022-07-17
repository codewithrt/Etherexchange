// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

contract Transaction{

    uint256 transactioncount = 1;

    struct Transferstruct{
        address receiver;
        address sender;
        uint256 amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    Transferstruct[] transactions ;

    event Transaferevent(address sender, address receiver, uint256 amount, string message,uint256 timestamp,string keyword);
    
    function addtoBlockchain(address payable receiver,uint256 amount,string memory message,string memory keyword ) public {
    //    Transactions[transactioncount] = Transferstruct(receiver,msg.sender,amount,message,block.timestamp,keyword);
       transactions.push(Transferstruct(receiver,msg.sender,amount,message,block.timestamp,keyword));

       emit Transaferevent(msg.sender, receiver, amount, message, block.timestamp, keyword);
       transactioncount += 1;
    }
    function getAllTransaction() public view returns ( Transferstruct[] memory ){
         return transactions ;
    }
    function getTransactionCount() public view returns (uint256) {
       return transactioncount;
    }
}