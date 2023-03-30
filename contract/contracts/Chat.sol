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
        messageCount++;
    }

    function getConversations(
        address address1,
        address address2
    ) public view returns (Message[] memory) {
        Message[] memory resultMessages = new Message[](messageCount);
        uint256 index = 0;
        for (uint256 i = 0; i < messageCount; i++) {
            if (
                (messages[i].to == address1 && messages[i].from == address2) ||
                (messages[i].to == address2 && messages[i].from == address1)
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
