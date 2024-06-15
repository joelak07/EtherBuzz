import React, { useState, useContext } from "react";
import { EtherBuzzContext } from "../../Context/EtherBuzzContext";

const NavBar = () => {
  const { set, get, number } = useContext(EtherBuzzContext);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSet = async () => {
    const value = parseInt(inputValue, 10);
    if (!isNaN(value)) {
      await set(value);
    }
  };

  const handleGet = async () => {
    await get();
  };

  return (
    <div>
      <div>NavBar</div>
      <input
        type="number"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter a number"
      />
      <button onClick={handleSet}>Set</button>
      <button onClick={handleGet}>Get</button>
      <div>Stored Number: {number}</div>
    </div>
  );
};

export default NavBar;
