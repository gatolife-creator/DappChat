// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.18;

contract TippingSystem {
    mapping(address => uint) public balances;
    mapping(address => bool) public locked;

    function tip(address _to) public payable {
        require(msg.value > 0, "Tip amount must be greater than zero");
        require(_to != address(0), "Invalid recipient address");
        require(!locked[msg.sender], "Transaction in progress");

        locked[msg.sender] = true;
        balances[_to] += msg.value;
        locked[msg.sender] = false;
    }

    function withdraw() public {
        uint amount = balances[msg.sender];
        require(amount > 0, "Insufficient balance");
        require(!locked[msg.sender], "Transaction in progress");

        locked[msg.sender] = true;
        balances[msg.sender] = 0;
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Withdraw failed");
        locked[msg.sender] = false;
    }
}
