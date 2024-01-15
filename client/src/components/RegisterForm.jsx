import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  
  const [name, setName] = useState("");
  const [mailid, setMail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //functions
  const create = async e => {
    e.preventDefault(); // dont want the thing to refresh
    try {
      console.log("hello");
      const body = { name , mailid, password };
      console.log(body)
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 w-1/3 h-auto flex flex-col">
      <div className="text-3xl text-black font-extrabold mb-10">
        Create Account
      </div>
      <div className="flex flex-col">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}

          class="w-full h-7/2 bg-white border-b-2 mt-7 text-black focus:outline-none"
          placeholder="Full Name"
        ></input>
        <input
          type="text"
          value={mailid}
          onChange={(e) => setMail(e.target.value)}
          class="w-full h-9/2 bg-white border-b-2 mt-7 text-black focus:outline-none"
          placeholder="Email"
        ></input>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          class="w-full h-9/4 bg-white border-b-2 mt-7 mb-5 text-black focus:outline-none"
          placeholder="Password"
        ></input>
        <button class="bg-blue-500 text-white rounded w-full" onClick={create}>
          Create Account
        </button>
        <div className="mt-5">
          <span className="text-black">Already Have an Account?</span>
          <button
            className="bg-white text-blue-500 border-none p-0 pl-1 focus:outline-none font-extrabold"
            onClick={() => {
              navigate("/");
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;