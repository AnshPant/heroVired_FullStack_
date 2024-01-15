import RightDash from "../components/RightDash";
import LeftDash from "../components/LeftDash";
import Header from "../components/Header";
import React, { useState, useEffect } from 'react';


const DashBoard = () => {

  const [fetchedData, setFetchedData] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);

  useEffect(() => {
    // Fetch data from the "getData" API endpoint
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/getData');
        const data = await response.json();
        setFetchedData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);

  const handleProgramClick = (program) => {
    setSelectedProgram(program);
    console.log(program);
  };


  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="flex bg-blue-950 w-full">
        <Header />
      </div>
      <div className="flex w-full h-full">
        <div className=" w-1/4 border-r-slate-200 border-r-2">
          Hello
          {/* <LeftDash /> */}
          <LeftDash
            fetchedData={fetchedData}
            handleProgramClick={handleProgramClick}
          />
        </div>
        <div className="w-3/4">
          Guys
          {/* <RightDash /> */}
          <RightDash selectedProgram={selectedProgram} />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;