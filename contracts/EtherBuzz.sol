// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EtherBuzz {
    
    struct Post {
        address poster;
        uint256 timestamp;
        string content;
        address[] likes;
        uint256 upvotes;
        uint256 downvotes;
        bytes32 postid;  // Use bytes32 for postid
    }

    struct User {
        address userAddress;
        string username;
        string emailid;
        bytes32[] postIds;
    }

    Post[] public posts;
    mapping(address => User) public users;
    address[] public userAddresses;

    event UserCreated(address indexed userAddress, string username);
    event PostCreated(address indexed poster, bytes32 postid, string content);

    modifier userExists(address userAddress) {
        require(bytes(users[userAddress].username).length > 0, "User does not exist");
        _;
    }

    function createUser(string memory _username, string memory _emailid) public {
        require(bytes(users[msg.sender].username).length == 0, "User already exists");
        users[msg.sender] = User(msg.sender, _username, _emailid, new bytes32[](0));
        userAddresses.push(msg.sender);
        emit UserCreated(msg.sender, _username);
    }

    function createPost(string memory _content) public userExists(msg.sender) {
        bytes32 postid = keccak256(abi.encodePacked(msg.sender, block.timestamp, _content));
        posts.push(Post({
            poster: msg.sender,
            timestamp: block.timestamp,
            content: _content,
            likes: new address ,
            upvotes: 0,
            downvotes: 0,
            postid: postid
        }));
        users[msg.sender].postIds.push(postid);
        emit PostCreated(msg.sender, postid, _content);
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
