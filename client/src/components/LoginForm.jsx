import { useNavigate  } from "react-router-dom";
import { useState } from "react";
import React, { useEffect } from 'react';

const LoginForm = () => {
    
  const [mailid, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);
  const navigate = useNavigate();
  const [otpInput, setOtpInput] = useState('');
  const [cotp, setCotp] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log('Updated cotp:', cotp);
  }, [cotp]);
 

  const handleLogin2 = async e => {
    e.preventDefault(); // dont want the thing to refresh
    try {
        const body = { mailid, password };
  
        const response = await fetch('http://localhost:5000/login2', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        console.log("response is: ",response.ok);
        const data = await response.json();
        
        if (response.ok) {
          console.log('Login successful iniitiating mail otp');
          const otpResponse = await fetch('http://localhost:5000/send-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mailid }),
        });
        
        console.log(otpResponse);
        if (otpResponse.ok) {
            const data2 = await otpResponse.json();
            const otapa = data2.otp ;
            const sotapa = otapa.toString();
            
            setCotp(sotapa);
             
          console.log('Two-factor authentication initiated. Enter the OTP received in your email.');
          setIsModalOpen(true);
        
        
        } else {
          console.error('Error initiating two-factor authentication:', await otpResponse.json());
        }

         
        } else {
          console.error(data.message); // Handle authentication error
        }

      
  
    } catch (err) {
      console.error(err.message);
    }
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
          class="w-full h-9/2 bg-white border-b-2 mb-5 text-black focus:outline-none"
          placeholder="Email"
        ></input>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          class="w-full h-9/4 bg-white border-b-2 mb-5 text-black focus:outline-none"
          placeholder="Password"
        ></input>
       
        <button
          class="bg-blue-500 text-white rounded w-full"
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
          class="w-full h-9/2 bg-white border-b-2 mb-5 text-black focus:outline-none"
          placeholder="OTP"
        ></input>
        
       
        <button
          class="bg-blue-500 text-white rounded w-full"
          onClick={handleOTP}
        >
          Submit
        </button>
         
      </div>
      </div>): null}
    </div>
  );
};

export default LoginForm;