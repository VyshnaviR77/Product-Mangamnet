import React, { useState } from "react";
import { User, Mail, Lock } from "lucide-react";
import { registerAPI } from "../Services/allAPI";
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {
  const [userInput, setuserInput] = useState({
    name: "",
    email: "",
    password: ""
  })
  console.log(userInput);
const navigate=useNavigate()
  const handleregister = async (e) => {
    e.preventDefault()
  
    const { name, email, password } = userInput
    if (name && email && password) {
      try {

        const res = await registerAPI(userInput)
        console.log(res);
        if(res.status==200){
          toast.success("registion successfull.... plsease login")
                    navigate('/login')
                    setuserInput({
                        name: "",
                        email: "",
                        password: ""

                    })
                }
                else if (res.status == 409) {
                    toast.warning(res.response.data)
                    navigate('/login')
                    setuserInput({
                        name: "",
                        email: "",
                        password: ""

                    })

                }
                else {
                    toast.error("Something went wrong")
                    setuserInput({
                        name: "",
                        email: "",
                        password: ""

                    })
                }
        


      }

      catch (error) {
        console.log(error);
      }


    }
  }

    return (
      <div className="min-h-screen bg-[#2b2b2b] flex items-center justify-center p-4">
        <div className="w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2">


          <div className="bg-[#003F63] text-white flex flex-col items-center justify-center px-8 py-12 md:px-12">

            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Welcome Back!
            </h2>

            <p className="text-center text-gray-200 mb-8 max-w-xs">
              To keep connected with us please login with your
              personal information
            </p>
<Link to='/login'>
            <button className="border-2 border-white px-10 py-3 rounded-full font-semibold hover:bg-white hover:text-[#003F63] transition-all duration-300">
              SIGN IN
            </button>
            </Link>
          </div>


          <div className="flex flex-col justify-center items-center px-8 py-12 md:px-12">

            <h1 className="text-3xl md:text-4xl font-bold text-[#F4A300] mb-8">
              Create Account
            </h1>

            <form className="w-full max-w-sm space-y-5">


              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input onChange={(e) => setuserInput({ ...userInput, name: e.target.value })}
                  type="text"
                  placeholder="Name"
                  className="w-full bg-gray-100 py-3 pl-12 pr-4 rounded-md outline-none focus:ring-2 focus:ring-[#F4A300]"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input onChange={(e) => setuserInput({ ...userInput, email: e.target.value })}
                  type="email"
                  placeholder="Email"
                  className="w-full bg-gray-100 py-3 pl-12 pr-4 rounded-md outline-none focus:ring-2 focus:ring-[#F4A300]"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <input onChange={(e) => setuserInput({ ...userInput, password: e.target.value })}
                  type="password"
                  placeholder="Password"
                  className="w-full bg-gray-100 py-3 pl-12 pr-4 rounded-md outline-none focus:ring-2 focus:ring-[#F4A300]"
                />
              </div>

              <div className="flex justify-center">
                <button onClick={(e)=>handleregister(e)}
                  type="submit"
                  className="w-50 bg-[#F4A300] hover:bg-[#dc9300] text-white py-3 px-8 rounded-full font-semibold transition-all duration-300"
                >
                  SIGN UP
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    );
  
}
  export default Register;