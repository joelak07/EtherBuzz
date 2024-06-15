// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EtherBuzz {
    uint256 private storedData;

    // Function to set the value of the stored data
    function set(uint256 x) public {
        storedData = x;
    }

    // Function to get the value of the stored data
    function get() public view returns (uint256) {
        return storedData;
    }
}
