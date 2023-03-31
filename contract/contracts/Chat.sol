// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.18;

import "hardhat/console.sol";

contract Chat {
    struct Message {
        address to;
        address from;
        string text;
        uint256 timestamp;
    }

    mapping(uint256 => Message) private messages;
    uint256 private messageCount;
    mapping(address => address[]) private correspondents;

    function post(address _to, string memory _text) public {
        // msg.sender から呼び出された場合、代替関数から呼び出された場合、gasを節約できるように、
        // toAddress と fromAddress を明示的に指定する
        address toAddress = _to;
        address fromAddress = msg.sender;
        messages[messageCount] = Message(
            toAddress,
            fromAddress,
            _text,
            block.timestamp
        );
        correspondents[msg.sender].push(toAddress);
        messageCount++;
    }

    function getCorrespondents() public view returns (address[] memory) {
        return correspondents[msg.sender];
    }

    function getConversations(
        address addr1,
        address addr2
    ) public view returns (Message[] memory) {
        Message[] memory resultMessages = new Message[](messageCount);
        uint256 index = 0;
        for (uint256 i = 0; i < messageCount; i++) {
            if (
                (messages[i].to == addr1 && messages[i].from == addr2) ||
                (messages[i].to == addr2 && messages[i].from == addr1)
            ) {
                resultMessages[index] = messages[i];
                index++;
            }
        }
        if (index < messageCount) {
            assembly {
                mstore(resultMessages, index)
            }
        }
        return resultMessages;
    }
}
