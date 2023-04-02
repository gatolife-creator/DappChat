// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.18;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract Chat {
    using EnumerableSet for EnumerableSet.AddressSet;

    struct Message {
        address to;
        address from;
        string text;
        uint256 timestamp;
    }

    struct CorrespondentThumb {
        address addr;
        string name;
        string text;
        uint256 timestamp;
    }

    mapping(uint256 => Message) private messages;
    uint256 private messageCount;
    mapping(address => EnumerableSet.AddressSet) private correspondents;
    mapping(address => string) private names;

    event onPost(
        address indexed from,
        address indexed to,
        string text,
        uint256 timestamp
    );

    function post(address _to, string memory _text) external {
        require(_to != address(0), "Invalid recipient address");
        require(bytes(_text).length > 0, "Invalid message text");
        address fromAddress = msg.sender;
        messages[messageCount] = Message(
            _to,
            fromAddress,
            _text,
            block.timestamp
        );
        correspondents[fromAddress].add(_to);
        correspondents[_to].add(fromAddress);
        messageCount++;
        emit onPost(fromAddress, _to, _text, block.timestamp);
    }

    function changeName(string calldata _name) public {
        names[msg.sender] = _name;
    }

    function getName(address _addr) public view returns (string memory) {
        return names[_addr];
    }

    function getCorrespondentThumbs(
        address[] memory _addrs
    ) public view returns (CorrespondentThumb[] memory) {
        CorrespondentThumb[] memory thumbsArray = new CorrespondentThumb[](
            _addrs.length
        );
        for (uint256 i = 0; i < _addrs.length; i++) {
            address addr = _addrs[i];
            string memory name = names[addr];
            Message[] memory localMessages = getConversations(addr);
            uint256 localMessageCount = localMessages.length;
            Message memory message = messages[localMessageCount - 1];
            CorrespondentThumb memory thumb = CorrespondentThumb(
                addr,
                name,
                message.text,
                message.timestamp
            );
            thumbsArray[i] = thumb;
        }
        return thumbsArray;
    }

    function getCorrespondents() public view returns (address[] memory) {
        EnumerableSet.AddressSet storage set = correspondents[msg.sender];
        address[] memory correspondentsArray = new address[](set.length());
        for (uint256 i = 0; i < set.length(); i++) {
            correspondentsArray[i] = set.at(i);
        }
        return correspondentsArray;
    }

    function getConversations(
        address _other
    ) public view returns (Message[] memory) {
        require(_other != address(0), "Invalid address");
        Message[] memory resultMessages = new Message[](messageCount);
        uint256 index = 0;
        for (uint256 i = 0; i < messageCount; i++) {
            if (
                (messages[i].to == _other && messages[i].from == msg.sender) ||
                (messages[i].to == msg.sender && messages[i].from == _other)
            ) {
                resultMessages[index] = messages[i];
                index++;
            }
        }
        assembly {
            mstore(resultMessages, index)
        }
        return resultMessages;
    }
}
