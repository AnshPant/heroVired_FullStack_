import { useNavigate  } from "react-router-dom";
import { useAuth } from '../Context/AuthContext';
import React, { useState } from 'react';

const LoginForm = () => {

  
    
  const [mailid, setMail] = useState("");
  const { login } = useAuth();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [otpInput, setOtpInput] = useState('');
  const [cotp, setCotp] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleLogin2 = async e => {
    e.preventDefault();  
    try {
        const body = { mailid, password };
  
        const response = await fetch('https://heroserver-zr04.onrender.com/login2', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
       
        const data = await response.json();
        
        if (response.ok) {
         
          const otpResponse = await fetch('https://heroserver-zr04.onrender.com/send-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mailid }),
        });
        if (otpResponse.ok) {
            const data2 = await otpResponse.json();
            const otapa = data2.otp ;
            const sotapa = otapa.toString();
            setCotp(sotapa);
          setIsModalOpen(true);
          login();
        } else {
          console.error('Error initiating two-factor authentication:', await otpResponse.json());
        } 
        } else {
          console.error(data.message);  
        } 
    } catch (err) {
      console.error(err.message);
    }
    login();
  };
  function handleOTP() {
    if(cotp == otpInput){
        navigate("/dashboard");
    }
    else alert("Check OTP and enter again.")
  }
  return (
    <div className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 w-1/3 h-1/3 flex flex-col">
      
      {!isModalOpen ? (<div><div className="text-3xl text-black font-extrabold mb-10">Sign-in</div>
      <div className="flex flex-col">
        <input
          type="text"
          value={mailid}
          onChange={(e) => setMail(e.target.value)}
          className="w-full h-9/2 bg-white border-b-2 mb-5 text-black focus:outline-none"
          placeholder="Email"
        ></input>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-9/4 bg-white border-b-2 mb-5 text-black focus:outline-none"
          placeholder="Password"
        ></input>
       
        <button
          className="bg-blue-500 text-white rounded w-full"
          onClick={handleLogin2}
        >
          Login
        </button>
        <div className="mt-5">
          <span className="text-black">Don't Have an Account ?</span>
          <button
            className="bg-white text-blue-500 border-none p-0 pl-1 focus:outline-none font-extrabold"
            onClick={() => {
              navigate("/register");
            }}
          >
            Signup Here
          </button>
        </div>
      </div></div>): null}

      {isModalOpen?(<div>
      <div className="text-3xl text-black font-extrabold mb-10">Sign-in</div>
      <div className="flex flex-col">
        <input
          type="text"
          value={otpInput}
          onChange={(e) => setOtpInput(e.target.value)}
          className="w-full h-9/2 bg-white border-b-2 mb-5 text-black focus:outline-none"
          placeholder="OTP"
        ></input>
        
       
        <button
          className="bg-blue-500 text-white rounded w-full"
          onClick={handleOTP}>
          Submit
        </button>
      </div>
      </div>): null}
    </div>
  );
};

export default LoginForm;