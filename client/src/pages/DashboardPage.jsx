import RightDash from "../components/RightDash";
import LeftDash from "../components/LeftDash";
import Header from "../components/Header";
import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';
import { useNavigate  } from "react-router-dom";

const DashBoard = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
 
  const [fetchedData, setFetchedData] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);

  const [woopy , setWoopy] = useState(false);
  const woops = (val) =>{
    setWoopy(val);
    setSelectedProgram(null);
    
  }
  useEffect(() => {
   
    const fetchData = async () => {
      try {
        const response = await fetch('https://heroserver-zr04.onrender.com/getData');
        const data = await response.json();
        setFetchedData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    
    fetchData();
    if (!isAuthenticated) {
      navigate("/");
      
    }
  }, [isAuthenticated,navigate,fetchedData]);

  

  const handleProgramClick = (program) => {
    setSelectedProgram(program);
    setWoopy(false);
    
  };


  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="flex bg-blue-950 w-full">
        <Header />
      </div>
      <div className="flex w-full h-full">
        <div className=" w-1/4 border-r-slate-200 border-r-2">
          Hello
       
          <LeftDash
            fetchedData={fetchedData}
            woops = {woops}
            handleProgramClick={handleProgramClick}
          />
        </div>
        <div className="w-3/4">
          Guys
        
          <RightDash selectedProgram={selectedProgram} addd = {woopy}  a={woops}/>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;