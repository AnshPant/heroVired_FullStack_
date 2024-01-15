
import React, { useState , useEffect } from 'react';

const RightDash = ({selectedProgram}) => {

    const [price, setPrice] = useState(240000);
    const [domain, setDomain] = useState('Data');
    const [ assurance, setAssurance] = useState(true);
    const [ name , setName] = useState('');
    const [ type, setType] = useState('');
    const [ reg, setRegister] = useState('');
    const [ university, setUniversity] = useState('LNMIIT');
    const [ certificate, setCertificate] = useState('BTech');
    const [ faculty, setFaculty] = useState('');
    const [ hours , setHours] = useState('');
    const [ eligibility , setEligibility] = useState('');
    const [ image, setImage] = useState('');
    const [ description , setDescription] = useState('');
    const [date , setDate] = useState('');
    const [isEditable, setIsEditable] = useState(true);
    // console.log("from right dash",selectedProgram);
    const [entry , setEntry] = useState([]);

    const currentDate = new Date();

// Get individual components of the date
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Month is zero-based
    const day = currentDate.getDate();

// Format the date as a string (e.g., "YYYY-MM-DD")
const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;


    const handlePriceChange = (e) => {
        
        setPrice(e.target.value);
        // console.log(price);
      };
// State for the selected option
const [selectedOption, setSelectedOption] = useState('');

// Function to handle changes in the dropdown
const handleChange = (cat, value) => {
    console.log("hanbdleChange Called")
    if (cat === 'price') {
      setPrice(value);
    }
     
    else if(cat === 'domain'){
        setDomain(value);
    }
    else if(cat === 'assurance'){
        setAssurance(value);
    }
    else if(cat === 'certificate'){
        setCertificate(value);
    }
   
    
   
    else if(cat === 'name'){
        setName(value);
    }
    else if(cat === 'type'){
        setType(value);
    }
    else if(cat === 'reg'){
        setRegister(value);
    }
    else if(cat === 'university'){
        setUniversity(value);
    }
    else if(cat === 'faculty'){
        setFaculty(value);
    }
    else if(cat === 'hours'){
        setHours(value);
    }
    else if(cat === 'eligibility'){
        setEligibility(value);
    }else if(cat === 'image'){
        setImage(value);
    }else if(cat === 'description'){
        setDescription(value);
    }
     
  };
      
  

  useEffect(() => {
    if (selectedProgram) {
       
      setPrice(selectedProgram.price || 240000);
      setDomain(selectedProgram.domain || 'Data');
      setAssurance(selectedProgram.placementassurance || true);
      setName(selectedProgram.name || '');
      setType(selectedProgram.programtype || '');
      setRegister(selectedProgram.registrations || '');
      setUniversity(selectedProgram.universityname || 'LNMIIT');
      setCertificate(selectedProgram.certificatediploma || 'BTech');
      setFaculty(selectedProgram.facultyprofileurl || '');
      setHours(selectedProgram.learninghours || '');
      setEligibility(selectedProgram.eligibilitycriteria || '');
      setImage(selectedProgram.imageurl || '');
      setDescription(selectedProgram.description || '');
      setDate(selectedProgram.date || '');
    }
  }, [selectedProgram]);

  const resetValues = () => {
     
    setPrice(240000);
    setDomain('Data');
    setAssurance(true);
    setName('');
    setType('');
    setRegister('');
    setUniversity('LNMIIT');
    setCertificate('BTech');
    setFaculty('');
    setHours('');
    setEligibility('');
    setImage('');
    setDescription('');
    setDate('');
  };

  
  const isAnyFieldEmpty = () => {
    return (
      price === '' ||
      domain === '' ||
      assurance === '' ||
      name === '' ||
      type === '' ||
      reg === '' ||
      university === '' ||
      certificate === '' ||
      faculty === '' ||
      hours === '' ||
      image === '' ||
      description === ''
    );
  };
  
  const saveDraft = () => {
    const check = isAnyFieldEmpty();
    
    const draftData = {
      price,
      domain,
      assurance,
      name,
      type,
      reg,
      university,
      certificate,
      faculty,
      hours,
      eligibility,
      image,
      description,
    
    };
  alert("Details saved in local storage");
    // Save the draft data to local storage or your preferred storage mechanism
    localStorage.setItem('draftData', JSON.stringify(draftData));
  };

  //posting data
  
  const handleSave = () => {
    setDate(formattedDate);
    console.log(date);
    const data = {
      "Name":name,
      "Price":price,
      "Domain":domain,
      "ProgramType":type,
      "Registrations":reg,
      "Description":description,
      
      "PlacementAssurance":assurance,
      "ImageUrl":image,
      "UniversityName":university,
      "FacultyProfileUrl":faculty,
     
      "LearningHours":hours,
      "CertificateDiploma":certificate,
      "EligibilityCriteria":eligibility,
      "Date": date,
    };
    console.log(data);
    // Post data to your API endpoint
    
    fetch('http://localhost:5000/createData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers if needed
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(result => {
        console.log('Data successfully posted:', result);
        // Handle the result or perform any additional actions
      })
      .catch(error => {
        console.error('Error posting data:', error);
        // Handle the error
      });
  };

    return (
      <div className="flex m-2 flex-col text-black items-start p-2">

        <div className="font-extrabold text-4xl ">Add Program</div>
        <div>
          <span className="text-red-500">*</span>Required to save as Program
        </div>
        <div className="text-3xl font-extrabold mt-7">Confirm Program</div>
        <div className="flex gap-x-10 items-center w-full justify-normal mt-2">
          <div className="flex flex-col items-start justify-center w-1/4">
            <label className="text-black font-bold">
              <span className="text-red-500">*</span>Price
            </label>
            <select className="bg-white w-full m-2 p-2 border-2 border-gray-200 rounded" value={price} onChange={handlePriceChange}  >
              <option value="240,000">INR 240,000</option>
              <option value="480,000">INR 480,000</option>
              <option value="720,000">INR 720,000</option>
              <option value="960,000">INR 960,000</option>
            </select>
          </div>
          <div className="flex flex-col items-start w-1/4">
            <label className="text-black font-bold">
              <span className="text-red-500">*</span>Domain
            </label>
            <select className="bg-white w-full m-2 p-2 border-2 border-gray-200 rounded"  value={domain} onChange={(e) => handleChange('domain', e.target.value)} >
              <option value="Data">Data</option>
              <option value="UI">UI</option>
              <option value="Database">Database</option>
              <option value="Artificial Intelligence">
                Artificial Intelligence
              </option>
            </select>
          </div>
          <div>
            <input
              type="checkbox"
              name="Placement Assurance"
              id="Placement Assurance"
              className="bg-white"
              checked={assurance}
          onChange={() => setAssurance((prevAssurance) => !prevAssurance)}
      
            ></input>
            <label htmlFor="Placement Assurance" className="m-1">
              Placement Assurance
            </label>
          </div>
        </div>
        <span className="text-gray-400 text-sm">
          You are Licensed to sell on this price
        </span>
        <div className="text-3xl font-extrabold mt-5">Information</div>
        <div className="flex flex-row items-start w-full gap-x-10 align-middle mt-5">
          <div className="flex flex-col w-1/4 items-start m-2">
            <label className="text-black font-bold">
              <span className="text-red-500">*</span>Name
            </label>
            <input
              type="text"
              className="bg-white text-black focus:outline-none w-full border-2 p-2 rounded"
              placeholder="Accelerated Program in Data Analytics"
              value={name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>
          <div className="flex flex-col items-start w-1/4 justify-center m-2">
            <label className="text-black font-bold">
              <span className="text-red-500">*</span>Program Type
            </label>
            <div className="flex">
              <input
                type="radio"
                id="FT"
                name="Program"
                value="FT"
                className="w-5"
                checked={type === 'FT'}
            onChange={() => setType('FT')}
              ></input>
              <label htmlFor="FT" className="ml-2">
                FT
              </label>
              <input
                type="radio"
                id="PT"
                name="Program"
                value="PT"
                className="ml-10 w-5"
                checked={type === 'PT'}
            onChange={() => setType('PT')}
              ></input>
              <label htmlFor="PT" className="ml-2">
                PT
              </label>
            </div>
          </div>
          <div className="flex flex-col items-start w-1/4 justify-center m-2">
            <label className="text-black font-bold">
              <span className="text-red-500">*</span>Registration Open
            </label>
            <div className="flex">
              <input
                type="radio"
                id="Yes"
                name="Reg"
                value="Yes"
                className="w-5"
                checked={reg === 'Yes'}
            onChange={() => setRegister('Yes')}
              ></input>
              <label htmlFor="Yes" className="ml-2">
                Yes
              </label>
              <input
                type="radio"
                id="No"
                name="Reg"
                value="No"
                className="ml-10 w-5"
                checked={reg === 'No'}
            onChange={() => setRegister('No')}
              ></input>
              <label htmlFor="No" className="ml-2">
                No
              </label>
            </div>
          </div>
        </div>
        <div className="flex gap-x-10 items-center w-full justify-normal mt-3">
          <div className="flex flex-col items-start justify-center w-1/4">
            <label className="text-black font-bold">
              <span className="text-red-500">*</span>University Name/Partner
            </label>
            <select className="bg-white w-full m-2 p-2 border-2 border-gray-200 rounded">
              <option value="LNMIIT">LNMIIT</option>
              <option value="IIT Delhi">IIT Delhi</option>
              <option value="NMIMS">NMIMS</option>
              <option value="JECRC">JECRC</option>
            </select>
          </div>
          <div className="flex flex-col items-start w-1/4">
            <label className="text-black font-bold">
              <span className="text-red-500">*</span>Certificate or Diploma
            </label>
            <select className="bg-white w-full m-2 p-2 border-2 border-gray-200 rounded">
              <option value="BTech">BTech</option>
              <option value="MTech">MTech</option>
              <option value="PhD">PhD</option>
              <option value="BS Honors">BS Honors</option>
            </select>
          </div>
          <div className="flex flex-col items-start w-1/4">
            <label className="text-black font-bold">
              <span className="text-red-500">*</span>Faculty Profile
            </label>
            <input
              type="text"
              className="bg-white text-black focus:outline-none w-full border-2 p-2 rounded"
              value={faculty}
              onChange={(e) => handleChange('faculty', e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-x-10 items-center w-full justify-normal ml-2 mt-3">
          <div className="flex flex-col items-start justify-center w-1/4">
            <label className="text-black font-bold">
              <span className="text-red-500">*</span>Learning Hours / Duration
            </label>
            <input
              type="text"
              className="bg-white text-black focus:outline-none w-full border-2 p-2 rounded"
              placeholder="9 Hours"
              value={hours}
              onChange={(e) => handleChange('hours', e.target.value)}
            />
          </div>
          <div className="flex flex-col items-start w-1/4">
            <label className="text-black font-bold">Eligibility Criteria</label>
            <input
              type="text"
              className="bg-white text-black focus:outline-none w-full border-2 p-2 rounded"
              placeholder="Graduate"
              value={eligibility}
              onChange={(e) => handleChange('eligibility', e.target.value)}
            />
          </div>
          <div className="flex flex-col items-start w-1/4">
            <label className="text-black font-bold">
              <span className="text-red-500">*</span>Image URL
            </label>
            <input
              type="text"
              className="bg-white text-black focus:outline-none w-full border-2 p-2 rounded"
              value={image}
              onChange={(e) => handleChange('image', e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-x-10 items-center w-full justify-normal mr-2 mt-3">
          <div className="flex flex-col items-start justify-center w-full h-max">
            <label className="text-black font-bold">
              <span className="text-red-500">*</span>Description
            </label>
            <textarea
              name="Text1"
              cols="40"
              className="w-full m-2 bg-white border-2 rounded p-2"
              placeholder="Program Information / header"
              value={description}
              onChange={(e) => handleChange('description', e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="w-full border-b-2 text-white p-3">Hello</div>
        <div className="w-full flex justify-between">
          <div>
            <button className="bg-white border-2 border-red-500 m-1 text-bold text-red-500 focus:outline-none hover:bg-red-500 hover:text-white hover:outline-none">
              Delete
            </button>
            <button className="bg-white border-2 border-blue-500 m-1 text-bold text-blue-500 focus:outline-none hover:bg-red-500 hover:text-white hover:outline-none" onClick={resetValues}>
              Reset
            </button>
          </div>
          <div className="flex">
            <button className="bg-white text-black text-bold border-2 border-gray-200 m-1 rounded"  onClick={saveDraft}>
              Save Draft
            </button>
            <button className="bg-blue-700 text-white rounded m-1 hover:bg-blue-500 focus:outline-none" onClick={handleSave}>
              Save Program
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default RightDash;