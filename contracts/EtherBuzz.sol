// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EtherBuzz {
    
    struct Post {
        address poster;
        uint256 timestamp;
        string content;
        address[] likes;
        uint256 likeCount;
    }

    struct User {
        address userAddress;
        string username;
        string emailid;
        uint256[] postIds;
    }

    Post[] public posts;
    mapping(address => User) public users;
    address[] public userAddresses;

    event UserCreated(address indexed userAddress, string username);


    modifier userExists(address userAddress) {
        require(bytes(users[userAddress].username).length > 0, "User does not exist");
        _;
    }

    function createUser(string memory _username, string memory _emailid) public {
        require(bytes(users[msg.sender].username).length == 0, "User already exists");
        users[msg.sender] = User(msg.sender, _username, _emailid, new uint256[](0));
        userAddresses.push(msg.sender);
        emit UserCreated(msg.sender, _username);
    }

    function getAllUsers() public view returns (address[] memory, string[] memory) {
        address[] memory addresses = new address[](userAddresses.length);
        string[] memory usernames = new string[](userAddresses.length);
        for (uint256 i = 0; i < userAddresses.length; i++) {
            addresses[i] = users[userAddresses[i]].userAddress;
            usernames[i] = users[userAddresses[i]].username;
        }
        return (addresses, usernames);
    }
}
