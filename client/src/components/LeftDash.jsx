

import React, { useState, useEffect } from 'react';
import Add from "../assets/Add.png";
import Search from "../assets/Search.png";
import ProgramList from "./ProgramList";

const LeftDash = ({ fetchedData, handleProgramClick }) => {
  const [numberOfEntries, setNumberOfEntries] = useState(0);

  const updateNumberOfEntries = (count) => {
    setNumberOfEntries(count);
  };

  const [filteredData, setFilteredData] = useState(fetchedData);
  const [searchName, setSearchName] = useState('');

  const handleInputChange = event => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchName(searchTerm);

    if (searchTerm === '') {
      setFilteredData(fetchedData);
    } else {
      const filteredResult = fetchedData.filter(item =>
        item.name.toLowerCase().includes(searchTerm)
      );
      setFilteredData(filteredResult);
    }
  };

  useEffect(() => {
    updateNumberOfEntries(fetchedData.length);
  }, [fetchedData]);
      
  return (
    <div className="flex flex-col h-full">
      <div className="text-black flex flex-row items-center w-full justify-between">
        <div className="items-start m-4 flex flex-col">
          <h2 className="text-4xl font-extrabold">Programs</h2>
          <div className="font-bold">Total : {numberOfEntries}</div>
        </div>
        <button className="h-14 w-14 rounded-full bg-blue-700 text-white mr-2 hover:bg-blue-500 focus:outline-none">
          <img src={Add} alt="Add" />
        </button>
      </div>
      <div className="m-2 flex items-center justify-center">
        <button className="bg-gray-200 border-2 border-gray-200 rounded-none rounded-s-lg h-10 focus:outline-none">
          <img src={Search} onClick={() => console.log(filterDataByName())}></img>
        </button>
        <input
          type="search"
          className="rounded-none rounded-l-* rounded-r-* w-full h-10 bg-white border-2 border-gray-200 p-2 text-black focus:outline-none"
          placeholder="Search by name"
          onChange={handleInputChange}
        ></input>
      </div>
      {/* ... rest of your LeftDash code ... */}
      
      <div className="h-full flex flex-col items-center justify-start">
        <ProgramList
          fetchedData={filteredData.length > 0 ? filteredData : fetchedData}
          handleProgramClick={handleProgramClick}
        />
      </div>
    </div>
  );
};

export default LeftDash;
